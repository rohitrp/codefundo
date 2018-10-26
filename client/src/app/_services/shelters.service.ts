import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shelter } from '../shelters/shelter';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SheltersService {

  apiBaseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient
  ) { }

  public addShelter(shelter: Shelter): Observable<any> {
    return this.http.post(
      `${this.apiBaseUrl}/shelters`,
      shelter
    );
  }
}
