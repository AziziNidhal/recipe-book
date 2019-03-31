import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipesService {
    recipeChanged = new Subject<Recipe[]>();


    constructor(private slService: ShoppingListService) {}

    private recipes: Recipe[] = [
        // new Recipe('A test recipe', 'This is simply a test recipe!',
        //             'https://www.mimicuisine.fr/wp-content/uploads/2018/05/pennes-940x940.jpg',
        //             [new Ingredient('salt', 5),
        //              new Ingredient('meat', 50)
        //             ]
        //         ),
        // new Recipe('A test recipe 2', 'This is simply a test recipe 2!',
        //             'https://www.mimicuisine.fr/wp-content/uploads/2018/05/pennes-940x940.jpg',
        //             [new Ingredient('sugar', 2),
        //              new Ingredient('milk', 10)
        //             ]
        //         )

    ];

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
    }


    getRecipes(): Recipe[] {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }


    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }

}
