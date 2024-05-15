import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  Name:string;
  Email:string;
  Message:string;

  onFormSubmit(ngForm: NgForm) {
    ngForm.resetForm();

    console.log('feedback form received.');
  }
}
