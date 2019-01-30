import {Injectable} from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import 'rxjs/Rx';
import {HttpClient, HttpRequest} from '@angular/common/http';

@Injectable()
export class DataStorageService {

  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    const request = new HttpRequest('PUT', 'https://angular-course-80668.firebaseio.com/recipes.json', recipes, {
      reportProgress: true
    });
    return this.httpClient.request(request);
  }

  getRecipes() {
    return this.httpClient.get<Recipe[]>('https://angular-course-80668.firebaseio.com/recipes.json', {
      observe: 'body',
      responseType: 'json'
    })
      .map(
        (recipes) => {
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe.ingredients = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]): void => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }

}
