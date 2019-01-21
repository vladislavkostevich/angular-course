import {Recipe} from './recipe.model';
import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected: EventEmitter<Recipe> = new EventEmitter();

  private recipes: Recipe[] = [
    new Recipe(
      'First Recipe Name',
      'First Recipe Description',
      'https://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900' +
      '/public/1506120378/MR_0917170472.jpg?itok=aWyDp3CA',
      [
        new Ingredient('Tomato', 5),
        new Ingredient('Potato', 10)
      ]),
    new Recipe(
      'Second Recipe Name',
      'Second Recipe Description',
      'https://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900' +
      '/public/1506120378/MR_0917170472.jpg?itok=aWyDp3CA',
      [
        new Ingredient('Apple', 1),
        new Ingredient('Orange', 4)
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
