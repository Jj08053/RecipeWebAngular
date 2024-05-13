import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecipeComponent } from './recipe/recipe.component';
import { CartComponent } from './cart/cart.component';
import { RecipesComponent } from './recipes/recipes.component';
import { CategoryComponent } from './category/category.component';
import { CartRecipeComponent } from './cart-recipe/cart-recipe.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'recipes', component: RecipesComponent},
  { path: 'recipe/:name', component: RecipeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'cart/category', component: CategoryComponent},
  { path: 'cart/cartRecipe', component: CartRecipeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
