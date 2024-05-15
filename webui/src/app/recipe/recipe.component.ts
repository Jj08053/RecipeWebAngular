import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  minYield: number
  maxYield: number
  optionList: { value: number; label: string; }[]
  serving: number
  clickedPost: boolean = false;
  allStatus: boolean = false;
  recipeName: string

  constructor(public route: ActivatedRoute, public httpClient: HttpClient, public router: Router) {

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
          if (this.recipe.serving.includes("to")){
            let yields = this.recipe.serving.split(" to ");
            this.minYield = +yields[0];
            this.maxYield = +yields[1];
            this.optionList =[{value:0.5 , label: `Half recipe (serve ${this.minYield/2} to ${this.maxYield/2} individuals)`}, 
              {value:1, label: `Full recipe (serve ${this.minYield} to ${this.maxYield} individuals)`},
              {value:2, label: `Double recipe (serve ${this.minYield*2} to ${this.maxYield*2} individuals)`}
          ];
          }
          else{
            this.minYield = +this.recipe.serving;
            this.maxYield = +this.recipe.serving;
            this.optionList =[{value:0.5, label: `Half recipe (serve ${this.minYield/2} individuals)`}, 
              {value:1, label: `Full recipe (serve ${this.minYield} individuals)`},
              {value:2, label: `Double recipe (serve ${this.minYield*2} individuals)`}
          ];
          }
          
        },
        error: (err) => {
          console.error("Error occurred: " + err);
        }
      });
  }

  postItemList() {
    this.clickedPost = true;

    if (!this.serving) {
      return;
    }

    let tempList: CartItem[] = [];
    let regex = /^[0-9]+$|^[0-9]+\/[0-9]+$/;

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
        if (unit.endsWith('s')){ unit = unit.slice(0,-1);}
        if (unit && !unit.includes("desired")){ unit = unit.concat("(s)");}
        amount *= this.serving;
        let name: string
        let idx = i.name.indexOf(",");
        if (idx > 0) {
          name = i.name.slice(0, idx);
        }
        else {
          name = i.name;
        }
        let itemJSONstring = `{"name": "${name}", "qty": ${amount}, "unit": "${unit}", "recipeName": "${this.recipeName}", "category": "${i.category}"}`;
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

      this.router.navigate(['cart']);
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
