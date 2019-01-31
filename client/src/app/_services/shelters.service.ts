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

  public getAllShelters(): Observable<Shelter[]> {
    return this.http.get<Shelter[]>(
      `${this.apiBaseUrl}/shelters`
    );
  }

  public getAllSheltersRequests(): Observable<any> {
    return this.http.get(
      `${this.apiBaseUrl}/users/request/all`
    );
  }

  public joinShelter(shelter): Observable<any> {
    return this.http.post(
      `${this.apiBaseUrl}/shelters/join`,
      { shelter: shelter }
    );
  }

  public leaveShelter(shelter): Observable<any> {
    return this.http.post(
      `${this.apiBaseUrl}/shelters/leave`,
      { shelter: shelter }
    );
  }

  public requestShelter(lngLat): Observable<any> {
    return this.http.post(
      `${this.apiBaseUrl}/users/request`,
      { lngLat: lngLat }
    );
  }

  public getShelterRequest(): Observable<any> {
    return this.http.get(
      `${this.apiBaseUrl}/users/request`
    );
  }

  // public getHospitalDetails(lngLat, distance): Observable<any> {
  //   return this.http.get(
  //     `https://dev.virtualearth.net/REST/v1/LocalSearch/`,
  //     {
  //       params: {
  //         'query': 'hospital',
  //         'userLocation': lngLat,
  //         'key': environment.bingMapsAPIKey
  //       }
  //     }
  //   );
  // }
}
