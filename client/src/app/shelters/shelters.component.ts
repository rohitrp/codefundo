import { Component, AfterViewInit } from '@angular/core';
import { AlertService } from '../_services/alert.service';
import { Shelter } from './shelter';
import { SheltersService } from '../_services/shelters.service';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import * as $ from 'jquery';

@Component({
  selector: 'app-shelters',
  templateUrl: './shelters.component.html',
  styleUrls: ['./shelters.component.css']
})
export class SheltersComponent implements AfterViewInit {
  mapboxAccessToken = environment.mapboxAccessToken;
  tab = 1;
  shelters = [];
  shelter = new Shelter('', '', '', '', '', '');

  addShelter() {
    this.shelter.lngLat = $('#lnglat').val();

    if (!this.shelter.lngLat) {
      this.alertService.errorWithMessage('Location on map is required');
      return;
    }

    this.shelterService.addShelter(this.shelter)
      .subscribe(
        (res) => this.alertService.success('Shelter successfully added'),
        (err) => this.alertService.error(err)
      );
  }

  constructor(
    private alertService: AlertService,
    private shelterService: SheltersService
  ) { }

  ngAfterViewInit() {
    Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(this.mapboxAccessToken);

    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/satellite-streets-v10',
      center: [72.914294, 19.130722],
      zoom: 16
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

    map.on('click', function (e) {
      if (this.shelterMarker) {
        this.shelterMarker.remove();
      }

      this.shelterMarker = new mapboxgl.Marker()
        .setLngLat(e.lngLat)
        .addTo(map);
      
      $('#lnglat').val(`${e.lngLat.lng},${e.lngLat.lat}`);
    });

  }

}
