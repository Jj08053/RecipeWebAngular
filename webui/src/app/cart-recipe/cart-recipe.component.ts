import { Component} from '@angular/core';
import { CartItem } from '../models/CartItem';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
        },
        error: (err) => {
          console.error("Error occurred: " + err);
        }
      });
  }


  isListed(str: string){
    for (let item of this.itemInfoList){
      if (item.recipeName.includes(str))
        return true; 
    }
    return false;
  }
}