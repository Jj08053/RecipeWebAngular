import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecipeComponent } from './recipe/recipe.component';
import { CartComponent } from './cart/cart.component';
import { RecipesComponent } from './recipes/recipes.component';
<<<<<<< HEAD
import { ContactComponent } from './home/contact/contact.component';
=======
import { CategoryComponent } from './category/category.component';
import { CartRecipeComponent } from './cart-recipe/cart-recipe.component';
>>>>>>> c3a14b944f415c585a01d6344a7c8ed235589156

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'recipes', component: RecipesComponent},
  { path: 'recipe/:name', component: RecipeComponent },
  { path: 'cart', component: CartComponent },
<<<<<<< HEAD
  { path: 'contact', component: ContactComponent }
=======
  { path: 'cart/category', component: CategoryComponent},
  { path: 'cart/cartRecipe', component: CartRecipeComponent}
>>>>>>> c3a14b944f415c585a01d6344a7c8ed235589156
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
