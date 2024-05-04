import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../models/Recipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent {
  url: string
  recipe: Recipe

  constructor(public route: ActivatedRoute, public httpClient: HttpClient) {
    //this.contactId = route.snapshot.paramMap.get("id");

    route.paramMap.subscribe({
      next: (params) => {
        this.url = "http://localhost:3000/recipe/" + params.get("name");
      }
    });

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Accept": 'application/json'
      })
    };

    this.httpClient.get<Recipe>(this.url, options)
      .subscribe({
        next: (data) => {
          this.recipe = data;
        },
        error: (err) => {
          console.error("Error occurred: " + err);
        }
      });
      
  }
}
