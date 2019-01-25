import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import 'rxjs/Rx';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DataStorageService {

  constructor(
    private http: Http,
    private recipeService: RecipeService,
    private authService: AuthService) {}

  storeRecipes() {
    const firebaseToken = this.authService.getToken();
    const recipes = this.recipeService.getRecipes();
    return this.http.put('https://angular-course-80668.firebaseio.com/recipes.json?auth=' + firebaseToken, recipes);
  }

  getRecipes() {
    const firebaseToken = this.authService.getToken();
    return this.http.get('https://angular-course-80668.firebaseio.com/recipes.json?auth=' + firebaseToken)
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
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
