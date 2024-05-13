import { Component } from '@angular/core';
import { CartItem } from '../models/CartItem';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  onActive(event: Event) {
    window.scrollTo(0, 0);
  }
}
