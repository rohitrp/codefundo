import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { environment } from 'src/environments/environment';
import { SheltersService } from 'src/app/_services/shelters.service';
import { Shelter } from '../shelter';
import { AlertService } from 'src/app/_services/alert.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-shelter-info',
  templateUrl: './shelter-info.component.html',
  styleUrls: ['./shelter-info.component.css']
})
export class ShelterInfoComponent implements OnInit {

  mapboxAccessToken = environment.mapboxAccessToken;
  shelter: Shelter;
  nearByHospitals = [];
  nearByAtms = [];
  nearByAirports = [];
  nearByPoliceStations = [];
  nearByTrainStations = [];
  nearByFireStations = [];

  shelterLng: any;
  shelterLat: any;

  constructor(
    private route: ActivatedRoute,
    private shelterService: SheltersService,
    private alertService: AlertService,
    public authService: AuthService
  ) { }

  distance(place) {
    const unit = 'K';
    const lon1 = place.geometry.location.lng;
    const lat1 = place.geometry.location.lat;
    const lon2 = +this.shelter.lngLat.split(",")[0];
    const lat2 = +this.shelter.lngLat.split(",")[1];

    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1 / 180;
      var radlat2 = Math.PI * lat2 / 180;
      var theta = lon1 - lon2;
      var radtheta = Math.PI * theta / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit === "K") { dist = dist * 1.609344 }
      return dist.toFixed(2);
    }
  }

  addMarkerToMap(map, places, type) {
    var maxIter = Math.min(5, places.length);

    var i = 0;
    for (i = 0; i < maxIter; i++) {
      var shelterMarkerDiv = document.createElement('div');
      shelterMarkerDiv.style.backgroundImage = `url("assets/${type}.png")`;
      shelterMarkerDiv.style.width = '32px';
      shelterMarkerDiv.style.height = '32px';
      shelterMarkerDiv.style.backgroundRepeat = 'no-repeat'

      const place = places[i];

      new mapboxgl.Marker(shelterMarkerDiv)
        .setLngLat([place.geometry.location.lng, place.geometry.location.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML('<h3 class="subtitle">' + place.name + '</h3>')
        )
        .addTo(map);
    }
  }

  ngOnInit() {
    const shelterId = this.route.snapshot.paramMap.get('id');

    this.shelterService.getShelterInfo(shelterId)
      .subscribe(
        (res) => {
          this.shelter = res;

          Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(this.mapboxAccessToken);

          var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/navigation-guidance-night-v4',
            center: this.shelter.lngLat.split(","),
            zoom: 12
          });
          
          var _tempShelterMarker = [
            {
              geometry: {
                location: {
                  lat: this.shelter.lngLat.split(',')[1],
                  lng: this.shelter.lngLat.split(',')[0],
                }
              },
              name: this.shelter.name
            }
          ];

          this.addMarkerToMap(map, _tempShelterMarker, 'shelter');

          this.shelterService.getNearbyPlaces(this.shelter.lngLat, 5000, 'hospital')
            .subscribe(
              (res) => {
                this.nearByHospitals = res.results;
                this.addMarkerToMap(map, this.nearByHospitals, 'hospital');
              },
              this.alertService.error
            );
          this.shelterService.getNearbyPlaces(this.shelter.lngLat, 5000, 'atm')
            .subscribe(
              (res) => {
                this.nearByAtms = res.results;
                this.addMarkerToMap(map, this.nearByAtms, 'atm')
              },
              this.alertService.error
            );
          this.shelterService.getNearbyPlaces(this.shelter.lngLat, 5000, 'airport')
            .subscribe(
              (res) => {
                this.nearByAirports = res.results;
                this.addMarkerToMap(map, this.nearByAirports, 'airport');              
              },
              this.alertService.error
            );
          this.shelterService.getNearbyPlaces(this.shelter.lngLat, 5000, 'police')
            .subscribe(
              (res) => {
                this.nearByPoliceStations = res.results;
                this.addMarkerToMap(map, this.nearByPoliceStations, 'police_station');              
              },
              this.alertService.error
            );
          this.shelterService.getNearbyPlaces(this.shelter.lngLat, 5000, 'train_station')
            .subscribe(
              (res) => {
                this.nearByTrainStations = res.results;
                this.addMarkerToMap(map, this.nearByTrainStations, 'train_station');              
              },
              this.alertService.error
            );
          this.shelterService.getNearbyPlaces(this.shelter.lngLat, 5000, 'fire_station')
            .subscribe(
              (res) => {
                this.nearByFireStations = res.results;
                this.addMarkerToMap(map, this.nearByFireStations, 'fire_station');              
              },
              this.alertService.error
            );
        },
        (err) => this.alertService.error(err)
      );

  }

}
