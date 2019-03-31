import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  constructor(private slService: ShoppingListService) { }
  private subscriptionIngredientChanged: Subscription;
  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.subscriptionIngredientChanged = this.slService.ingredientChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  ngOnDestroy(){
    this.subscriptionIngredientChanged.unsubscribe();
  }

  onEditItem(index: number){
    this.slService.startedEditing.next(index);
  }

}
