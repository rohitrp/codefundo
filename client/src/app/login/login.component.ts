import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  public login() {
    this.authService.login(this.email, this.password)
      .subscribe(
        (res) => {
          localStorage.setItem('user', JSON.stringify(res['user']))
        },
        (err) => this.alertService.error(err)
      );
  }

  constructor(
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }
}
