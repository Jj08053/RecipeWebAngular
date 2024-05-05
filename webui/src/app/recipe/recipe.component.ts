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
  itemName: string[] = [];
  itemQty: number[] = [];
  itemUnit: string[] = [];
  serving: number
  clicked: boolean = false;

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
        // next: (data) => {
        //   this.recipe = data;
        //   this.ingredients = this.recipe.ingredients;
        // },
        // error: (err) => {
        //   console.error("Error occurred: " + err);
        // }
      });
  }

  getItemList() {
    this.clicked = true;

    if (!this.serving){
      return;
    }

    for (let i of this.ingredients) {
      if (i.isChecked === true) {
        let words = i.measurement.split(" ");
        let amount: number = 0
        let regex = /[0-9]+|[0-9]\/[0-9]/;
        for (let word of words){
          if (regex.test(word)){
            if (word.indexOf("/") > 0){
              amount += (+word[0]/+word[2]);
            }
            else{
              amount += +word;
            }
          }
          else{
            if (word.includes("(")){
              this.itemUnit.push("as desired");
              break;
            }
            this.itemUnit.push(word);
          }
        }
        this.itemQty.push(amount * this.serving);

        let name : string
        let idx = i.name.indexOf(",");
        if (idx > 0){
          name = i.name.slice(0, idx);
          this.itemName.push(name);
        }
        else
          this.itemName.push(i.name);
      }
    }

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Accept": 'application/json'
      })
    };

    const data = {
      itemNameList: this.itemName,
      itemQtyList: this.itemQty,
      itemUnitList: this.itemUnit,
    };

    this.httpClient.post("http://localhost:3000", data, options)
      .subscribe({
          next: (body) => {
            console.log("Post successful");
            console.log(body);
          },
          error: (err) => {
            console.error("Error occured: " + JSON.stringify(err));
          }
      });
  }
}
