import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
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
}
