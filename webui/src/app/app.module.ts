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
<<<<<<< HEAD
import { ContactComponent } from './home/contact/contact.component';
=======
import { CategoryComponent } from './category/category.component';
import { CartRecipeComponent } from './cart-recipe/cart-recipe.component';
>>>>>>> c3a14b944f415c585a01d6344a7c8ed235589156

@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    HomeComponent,
    CartComponent,
    RecipesComponent,
<<<<<<< HEAD
    ContactComponent
=======
    CategoryComponent,
    CartRecipeComponent
>>>>>>> c3a14b944f415c585a01d6344a7c8ed235589156
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
