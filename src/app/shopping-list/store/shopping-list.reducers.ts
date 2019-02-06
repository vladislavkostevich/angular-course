import * as ShoppingListActions from './shopping-list.actions';

import {Ingredient} from '../../shared/ingredient.model';

export interface State {
  ingredients: Ingredient[];
  editingIngredient: Ingredient;
  editingIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Ingredient Name', 5),
    new Ingredient('Tomato', 10)
  ],
  editingIngredient: null,
  editingIngredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const updatedIngredient = {
        ...state.ingredients[state.editingIngredientIndex],
        ...action.payload.ingredient
      };
      const ingredientsForUpdate = [...state.ingredients];
      ingredientsForUpdate[state.editingIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: ingredientsForUpdate,
        editingIngredient: null,
        editingIngredientIndex: -1
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      const ingredientsForDelete = [...state.ingredients];
      ingredientsForDelete.splice(state.editingIngredientIndex, 1);
      return {
        ...state,
        ingredients: ingredientsForDelete,
        editingIngredient: null,
        editingIngredientIndex: -1
      };
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editingIngredient: {...state.ingredients[action.payload]},
        editingIngredientIndex: action.payload
      };
    case ShoppingListActions.STOP_EDIT: {
      return {
        ...state,
        editingIngredient: null,
        editingIngredientIndex: -1
      };
    }
    default:
      return state;
  }
}
