import { Component, AfterViewInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Component({
  selector: 'app-request-shelter',
  templateUrl: './request-shelter.component.html',
  styleUrls: ['./request-shelter.component.css']
})
export class RequestShelterComponent implements AfterViewInit {
  mapboxAccessToken = environment.mapboxAccessToken;

  constructor() { }

  ngAfterViewInit() {
    Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(this.mapboxAccessToken);

    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/navigation-guidance-night-v4',
      center: [72.914294, 19.130722],
      zoom: 12
    });

    map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }));

    map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken
    }));
  }

}
