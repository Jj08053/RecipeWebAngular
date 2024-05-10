import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  panels = [
    { id: 1, title: 'Cake', image: 'cake.jpg', visible: true },
    { id: 2, title: 'Chili', image: 'chili.jpg', visible: false },
    { id: 3, title: 'Penne', image: 'penne.jpg', visible: false }
  ];

  showPanel(panel) {
    this.panels.forEach(p => p.visible = false);
    panel.visible = true;
  }

  constructor(public router:Router) {

  }
  
  goToRecipe(id:number) {
    this.router.navigateByUrl('/recipe/'+id);
  }

}
