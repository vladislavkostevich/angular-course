import {Component, EventEmitter, Output} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  @Output() recipeWasSelected: EventEmitter<Recipe> = new EventEmitter();

  recipes: Recipe[] = [
    new Recipe('First Recipe Name', 'First Recipe Description', 'https://cdn-image.myrecipes.com/sites/default/files/styles' +
      '/4_3_horizontal_-_1200x900/public/1506120378/MR_0917170472.jpg?itok=aWyDp3CA'),
    new Recipe('Second Recipe Name', 'Second Recipe Description', 'https://cdn-image.myrecipes.com/sites/default/files/styles' +
      '/4_3_horizontal_-_1200x900/public/1506120378/MR_0917170472.jpg?itok=aWyDp3CA')
  ];

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
