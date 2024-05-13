import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RecipeComponent } from './recipe/recipe.component';
import { HomeComponent } from './home/home.component';
import { CartComponent} from './cart/cart.component';
import { RecipesComponent } from './recipes/recipes.component';
import { CategoryComponent } from './category/category.component';
import { CartRecipeComponent } from './cart-recipe/cart-recipe.component';
import { recipeFilterPipe } from './cart-recipe/recipeFilter';

@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    HomeComponent,
    CartComponent,
    RecipesComponent,
    CategoryComponent,
    CartRecipeComponent,
    recipeFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
