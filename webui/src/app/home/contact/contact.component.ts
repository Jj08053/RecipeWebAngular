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

  constructor(private http: HttpClient) { }

  onFormSubmit(ngForm: NgForm) {
    const data = {
      name: this.Name,
      email: this.Email,
      message: this.Message
    };

    ngForm.resetForm();
    // Send data to backend . not finished yet
    this.http.post('http://localhost:3000/contact', data)
      .subscribe(response => {
        console.log('Form submitted successfully:', response);
      }, error => {
        console.error('Error submitting form:', error);
      });
  }
}
