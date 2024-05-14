import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../models/Recipe';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  names: string[] = [];
  recipesList: Recipe[] = [];
  panels: { name: string, title: string, image: string, visible: boolean }[] = [];

  constructor(
    public httpClient: HttpClient,
    public router:Router
  ) 
  {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Accept": 'application/json'
      })
    };

    this.httpClient.get<Recipe[]>("http://localhost:3000/recipes", options)
      .subscribe({
        next: (data) => {
          this.recipesList = data;  
          data.forEach((recipe,index) => {
            const isVisible = index === 0; // Set first panel to visible
            this.panels.push({
              name: recipe.name,
              title: recipe.name,
              image: recipe.image,
              visible: isVisible
            });
          });
        },
        error: (err) => {
          console.error("Error occurred: " + err);
        }
      });
  }

  showPanel(panel) {
    // if (panel.visible === true){
    //   this.goToRecipe(panel.title);
    // }
    this.panels.forEach(p => p.visible = false);
    panel.visible = true;
  }

  goToRecipe(id:string) {
    const encodedId = id.replace(/\(/g, '%28').replace(/\)/g, '%29');
    this.router.navigateByUrl('/recipe/'+ encodedId);
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  }

