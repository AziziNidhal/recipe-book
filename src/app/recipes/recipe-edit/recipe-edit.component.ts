import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  recipe: Recipe;
  editMode = false;
  recipeForm: FormGroup;
  constructor(private recipesService: RecipesService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.editMode = (params.id != null);
        this.recipe = this.recipesService.getRecipe(this.id);
        this.initForm();
      }
    );
  }

  private initForm() {

    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipesService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe.ingredients) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [Validators.required,
                                                        Validators.pattern('^[1-9]+[0-9]*$')
                                                        ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });
  }

  getControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }


  onAddIngredient() {
    const ingredientControl = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required,
                                    Validators.pattern('^[1-9]+[0-9]*$')
                                    ])
    });
    ( this.recipeForm.get('ingredients') as FormArray).push(ingredientControl);
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  onSubmit() {
    console.log(this.recipeForm.value);
    // const newRecipe = new Recipe(this.recipeForm.value.name,
    //                               this.recipeForm.value.description,
    //                               this.recipeForm.value.imagePath,
    //                               this.recipeForm.value.ingredients);
    if (this.editMode) {
      this.recipesService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipesService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    // this.recipeForm.reset();
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
