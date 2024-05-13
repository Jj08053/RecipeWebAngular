import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../models/Recipe';
import { Ingredient } from '../models/Ingredient';
import { CartItem } from '../models/CartItem';

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
  recipeName: string

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
          this.recipeName = this.recipe.name;
        },
        error: (err) => {
          console.error("Error occurred: " + err);
        }
      });
  }

  postItemList() {
    this.clickedPost = true;

    let regex = /^[0-9]+$|^[0-9]+\.[0-9]+$/;
    if (!this.serving || !regex.test(this.serving.toString())) {
      return;
    }

    let tempList: CartItem[] = [];
    regex = /^[0-9]+$|^[0-9]+\/[0-9]+$/;

    for (let i of this.ingredients) {
      if (i.isChecked === true) {
        let words = i.measurement.split(" ");
        let amount: number = 0;
        let unit: string = "";
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
        else {
          name = i.name;
        }
        let itemJSONstring = `{"name": "${name}", "qty": ${amount}, "unit": "${unit}", "recipeName": "${this.recipeName}"}`;
        tempList.push(JSON.parse(itemJSONstring));
      }
    }

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Accept": 'application/json'
      })
    };

    const data = {
      itemInfo: tempList
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

  allChange() {
    this.allStatus = !this.allStatus;
    for (let i of this.ingredients) {
      i.isChecked = this.allStatus;
    }
  }

  eachChange(ingredient: Ingredient) {
    ingredient.isChecked = !ingredient.isChecked;
    if (this.allStatus = true)
      this.allStatus = false;

    let counter = 0;
    for (let i of this.ingredients) {
      if (true == i.isChecked) {
        counter++;
      }
    }
    if (counter === this.ingredients.length) {
      this.allStatus = true;
    }
  }
}
