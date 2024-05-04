import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Recipe } from '../models/Recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent {
  recipesList: Recipe[];

  constructor(public httpClient: HttpClient) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Accept": 'application/json'
      })
    };

    this.httpClient.get<Recipe[]>("http://localhost:3000/recipes", options)
      .subscribe({
        next: (data) => {
          this.recipesList = data;
        },
        error: (err) => {
          console.error("Error occurred: " + err);
        }
      });
  }
}
