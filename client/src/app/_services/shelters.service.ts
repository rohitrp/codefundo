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

  public getShelterInfo(id): Observable<any> {
    return this.http.get(
      `${this.apiBaseUrl}/shelters/${id}`
    );
  }

  public getNearbyPlaces(lngLat, radius, type): Observable<any> {
    return this.http.get(
      `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
      {
        params: {
          'type': type,
          'location': lngLat.split(",").reverse().join(","),
          'key': environment.googleMapsAPIKey,
          'radius': radius
        }
      }
    );
  }
}