import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  apiBaseUrl = environment.apiBaseUrl;

  public signup(email: String, password: String): Observable<any> {
    return this.http.post(
      `${this.apiBaseUrl}/users`,
      {
        email: email,
        password: password
      }
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
}
