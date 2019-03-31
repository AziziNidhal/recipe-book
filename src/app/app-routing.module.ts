import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.service';
import { RecipesCanLoadGuard } from './recipes-can-load-guard.service';
import { HomeComponent } from './core/home/home.component';

const appRoutes: Routes = [
    {path: '' , component: HomeComponent},
    {path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule', canLoad:[RecipesCanLoadGuard]},
    {path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'},
    {path: '', loadChildren: './auth/auth.module#AuthModule'}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
