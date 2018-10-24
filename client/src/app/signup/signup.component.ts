import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email: string = 'rp@rp.com';
  password: string = 'rp';

  public register() {
    this.authService.signup(this.email, this.password)
      .subscribe(
        (res) => console.log,
        (err) => console.error
      );
  }

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

}
