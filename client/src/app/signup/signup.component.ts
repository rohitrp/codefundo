import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email: string;
  password: string;

  public register() {
    console.log(this.email);
    console.log(this.password);
    
  }

  constructor() { }

  ngOnInit() {
  }

}
