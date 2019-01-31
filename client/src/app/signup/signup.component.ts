import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertService } from '../_services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  mobileNumber: number;
  aadharNumber: number;

  public signup() {
    const user = {
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      mobileNumber: +this.mobileNumber,
      aadharNumber: +this.aadharNumber
    };

    this.authService.signup(user)
      .subscribe(
        (res) => {
          localStorage.setItem('user', JSON.stringify(res['user']));
          this.router.navigate(['']);
        },
        (err) => this.alertService.error(err)
      );
  }

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']);
    }
  }

}
