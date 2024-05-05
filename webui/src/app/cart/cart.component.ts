import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Recipe } from '../models/Recipe';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  itemInfoList

  constructor(public httpClient: HttpClient) {
    //this.contactId = route.snapshot.paramMap.get("id");


    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Accept": 'application/json'
      })
    };

    this.httpClient.get("http://localhost:3000/cart", options)
      .subscribe({
        next: (data) => {
          this.itemInfoList = data;
          console.log(this.itemInfoList);
        },
        error: (err) => {
          console.error("Error occurred: " + err);
        }
      });
  }
}