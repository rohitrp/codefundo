import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) { }

  apiBaseUrl = environment.apiBaseUrl;

  public signup(user): Observable<any> {
    return this.http.post(
      `${this.apiBaseUrl}/users`,
      user
    );
  }

  public login(email: String, password: String): Observable<any> {
    return this.http.post(
      `${this.apiBaseUrl}/users/authenticate`,
      {
        email: email,
        password: password
      }
    );
  }

  public logout() {
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

  public isAuthenticated() {
    return !this.jwtHelper.isTokenExpired(this.getToken());
  }

  public getToken() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      return '';
    }

    return user.token;
  }

  public isUserVerified() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      return '';
    }

    return user.verifiedMobile;
  }

  public refreshToken() {
    this.http.post(
      `${this.apiBaseUrl}/token/refresh`,
      {}
    ).subscribe(
      (res) => {
        localStorage.setItem('user', JSON.stringify(res['user']));
        this.router.navigate(['']);
      }
    );
  }

  public generateOtp() {
    return this.http.post(
      `${this.apiBaseUrl}/users/otp`, {}
    );
  }

  public verifyOtp(otp) {
    const params = {
      otp: otp
    };
    return this.http.get(
      `${this.apiBaseUrl}/users/otp`, {
        params: params
      }
    );
  }

  public getUserDetails() {
    return this.http.get(
      `${this.apiBaseUrl}/users/details`
    );
  }
}
