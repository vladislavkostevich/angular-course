import {Actions, Effect, ofType} from '@ngrx/effects';
import * as RecipeActions from './recipes.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Recipe} from '../recipe.model';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {FeatureState} from './recipes.reducers';

@Injectable()
export class RecipesEffects {
  @Effect()
  recipesFetch = this.actions$
    .pipe(
      ofType(RecipeActions.FETCH_RECIPES),
      switchMap((action: RecipeActions.FetchRecipes) => {
        return this.httpClient.get<Recipe[]>('https://angular-course-80668.firebaseio.com/recipes.json', {
          observe: 'body',
          responseType: 'json'
        });
      }),
      map(
        (recipes) => {
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe.ingredients = [];
            }
          }
          return {
            type: RecipeActions.SET_RECIPES,
            payload: recipes
          };
        }
      ));

  @Effect({dispatch: false})
  recipesStore = this.actions$
    .pipe(
      ofType(RecipeActions.STORE_RECIPES),
      withLatestFrom(this.store.select('recipes')),
      switchMap(([action, state]) => {
        const request = new HttpRequest('PUT', 'https://angular-course-80668.firebaseio.com/recipes.json', state.recipes, {
          reportProgress: true
        });
        return this.httpClient.request(request);
      })
    );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<FeatureState>) {
  }

}
