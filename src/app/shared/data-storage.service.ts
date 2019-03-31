import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
    constructor(private http: Http,
                private recipesService: RecipesService,
                private authService: AuthService
                ) {}

    storeRecipes() {
        const token = this.authService.getToken();
        return this.http.put('https://angular-recipes-udemy.firebaseio.com/recipes.json?auth='+token, this.recipesService.getRecipes());
    }

    getRecipes() {
        const token = this.authService.getToken();
        return this.http.get('https://angular-recipes-udemy.firebaseio.com/recipes.json?auth='+token)
        .pipe(map(
            (response: Response) => {
                const recipes: Recipe[] = response.json();
                for (const recipe of recipes) {
                    if (!recipe.ingredients) {
                        recipe.ingredients = [];
                    }
                }
                return recipes;
            }
        ))
        .subscribe(
            (recipes: Recipe[]) => {
                this.recipesService.setRecipes(recipes);
            }
        );
    }
}
