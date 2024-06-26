import { Component } from '@angular/core';
import { CartItem } from '../models/CartItem';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})

export class CategoryComponent {
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
      if (item.category === str)
        return true; 
    }
    return false;
  }
}
