import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AddIngredients} from '../../shopping-list/store/shopping-list.actions';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {FeatureState, State} from '../store/recipes.reducers';
import {DeleteRecipe} from '../store/recipes.actions';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipeId: number;
  recipeState: Observable<State>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<FeatureState>) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.recipeId = +params['id'];
      this.recipeState = this.store.select('recipes');
    });
  }

  onAddToShoppingList() {
    this.store.select('recipes')
      .pipe(take(1))
      .subscribe(
        (recipesState: State) => {
          this.store.dispatch(new AddIngredients(recipesState.recipes[this.recipeId].ingredients));
        }
      );
  }

  onEditRecipe() {
    this.router.navigate(['../', this.recipeId, 'edit'], {relativeTo: this.activatedRoute});
  }

  onDeleteRecipe() {
    this.store.dispatch(new DeleteRecipe(this.recipeId));
    this.router.navigate(['recipes']);
  }
}
