import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../models/Recipe';
import { Ingredient } from '../models/Ingredient';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent {
  url: string
  recipe: Recipe
  ingredients: Ingredient[]
  serving: number
  clickedPost: boolean = false;
  error: boolean = true;
  allStatus: boolean = false;

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
          this.ingredients = this.recipe.ingredients;
        },
        error: (err) => {
          console.error("Error occurred: " + err);
        }
      });
  }

  postItemList() {
    this.clickedPost = true;

    let pattern =/^[0-9]+$|[0-9]+\.[0-9]+/;
    if (!this.serving || !pattern.test(this.serving.toString())) {
      return;
    }

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Accept": 'application/json'
      })
    };

    for (let i of this.ingredients) {
      if (i.isChecked === true) {
        let words = i.measurement.split(" ");
        let amount: number = 0;
        let unit: string = "";
        let itemJSONstring = "";
        let itemList: JSON[] = [];
        let regex = /[0-9]+|[0-9]\/[0-9]/;
        for (let word of words) {
          if (regex.test(word)) {
            if (word.indexOf("/") > 0) {
              amount += (+word[0] / +word[2]);
            }
            else {
              amount += +word;
            }
          }
          else {
            if (word.includes("(")) {
              unit = "as desired";
              break;
            }
            unit += word;
          }
        }
        amount *= this.serving;
        let name: string
        let idx = i.name.indexOf(",");
        if (idx > 0) {
          name = i.name.slice(0, idx);
        }
        else{
          name = i.name;
        }
        itemJSONstring = `{"name": "${name}", "qty": ${amount}, "unit": "${unit}"}`;
        itemList = (JSON.parse(itemJSONstring));

        const data = {
          itemList: itemList
        };

        this.httpClient.post("http://localhost:3000/cart", data, options)
          .subscribe({
            // next: (body) => {
            //   console.log("Post successful");
            //   console.log(body);
            // },
            // error: (err) => {
            //   console.error("Error occured: " + JSON.stringify(err));
            // }
          });
      }
    }
  }

  allChange(){
    this.allStatus = !this.allStatus;
    for (let i of this.ingredients){
      i.isChecked = this.allStatus;
    }
  }

  eachChange(ingredient: Ingredient){
    ingredient.isChecked = !ingredient.isChecked;
    if (this.allStatus = true)
      this.allStatus = false;

    let counter = 0;
    for (let i of this.ingredients){
      if (true == i.isChecked){
        counter++;
      }
    }
    if (counter === this.ingredients.length){
      this.allStatus = true;
    }
  }
}
