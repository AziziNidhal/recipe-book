import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';

const slRoutes: Routes = [
    {path: '' , component: ShoppingListComponent}
];

@NgModule({
    imports: [RouterModule.forChild(slRoutes)],
    exports: [RouterModule]
})
export class ShoppingListRoutingModule {

}
