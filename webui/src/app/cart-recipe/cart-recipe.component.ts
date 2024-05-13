import { Component} from '@angular/core';
import { CartItem } from '../models/CartItem';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-cart-recipe',
  templateUrl: './cart-recipe.component.html',
  styleUrl: './cart-recipe.component.scss',
  
})

export class CartRecipeComponent {
  itemInfoList:CartItem[]= []

  constructor(public httpClient: HttpClient) {

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Accept": 'application/json'
      })
    };

    this.httpClient.get<CartItem[]>("http://localhost:3000/cart", options)
      .subscribe({
        next: (data) => {
          this.itemInfoList = data;
          //this.recipe = this.itemInfoList.recipeName;
        },
        error: (err) => {
          console.error("Error occurred: " + err);
        }
      });
  }

  onActive(event: Event) {
    window.scrollTo(0, 0);
  }
}