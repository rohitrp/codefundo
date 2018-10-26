import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertService } from '../_services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = 'rp@rp.com';
  password: string = 'rp';

  public login() {
    this.authService.login(this.email, this.password)
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
