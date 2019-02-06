import {Recipe} from '../recipe.model';
import {Ingredient} from '../../shared/ingredient.model';

import * as RecipesActions from './recipes.actions';
import {AppState} from '../../store/app.reducers';

export interface FeatureState extends AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
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
  ]
};

export function recipesReducer(state = initialState, action: RecipesActions.RecipesActions) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipesActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipesActions.UPDATE_RECIPE:
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.recipe
      };
      const recipesForUpdate = [...state.recipes];
      recipesForUpdate[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: recipesForUpdate
      };
    case RecipesActions.DELETE_RECIPE:
      const recipesForDelete = [...state.recipes];
      recipesForDelete.splice(action.payload, 1);
      return {
        ...state,
        recipes: recipesForDelete
      };
    default:
      return state;
  }
}
