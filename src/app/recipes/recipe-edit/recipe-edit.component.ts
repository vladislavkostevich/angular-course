import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeEditForm: FormGroup;
  recipeId: number;
  editMode = false;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.recipeId = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let imagePath = '';
    let description = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.recipeId);

      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      if (recipe.ingredients) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [
              Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          }));
        }
      }
    }

    this.recipeEditForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  getIngredientControls() {
    return (<FormArray>this.recipeEditForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeEditForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    }));
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.recipeId, this.recipeEditForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeEditForm.value);
    }
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeEditForm.get('ingredients')).removeAt(index);
  }

}
