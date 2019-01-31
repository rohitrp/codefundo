import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { environment } from 'src/environments/environment';
import { SheltersService } from 'src/app/_services/shelters.service';
import { Shelter } from '../shelter';
import { AlertService } from 'src/app/_services/alert.service';

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
    private alertService: AlertService
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

  ngOnInit() {
    const shelterId = this.route.snapshot.paramMap.get('id');

    this.shelterService.getShelterInfo(shelterId)
      .subscribe(
        (res) => {
          this.shelter = res;

          Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(this.mapboxAccessToken);

          var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/satellite-streets-v10',
            center: this.shelter.lngLat.split(","),
            zoom: 12
          });

          this.shelterService.getNearbyPlaces(this.shelter.lngLat, 5000, 'hospital')
            .subscribe(
              (res) => this.nearByHospitals = res.results,
              this.alertService.error
            );
          this.shelterService.getNearbyPlaces(this.shelter.lngLat, 5000, 'atm')
            .subscribe(
              (res) => {
                this.nearByAtms = res.results;
              },
              this.alertService.error
            );
          this.shelterService.getNearbyPlaces(this.shelter.lngLat, 5000, 'airport')
            .subscribe(
              (res) => this.nearByAirports = res.results,
              this.alertService.error
            );
          this.shelterService.getNearbyPlaces(this.shelter.lngLat, 5000, 'police')
            .subscribe(
              (res) => this.nearByPoliceStations = res.results,
              this.alertService.error
            );
          this.shelterService.getNearbyPlaces(this.shelter.lngLat, 5000, 'train_station')
            .subscribe(
              (res) => this.nearByTrainStations = res.results,
              this.alertService.error
            );
          this.shelterService.getNearbyPlaces(this.shelter.lngLat, 5000, 'fire_station')
            .subscribe(
              (res) => this.nearByFireStations = res.results,
              this.alertService.error
            );
        },
        (err) => this.alertService.error(err)
      );

  }

}
