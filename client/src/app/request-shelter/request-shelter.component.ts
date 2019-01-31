import { Component, AfterViewInit, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { SheltersService } from '../_services/shelters.service';
import * as $ from 'jquery';
import { AlertService } from '../_services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-shelter',
  templateUrl: './request-shelter.component.html',
  styleUrls: ['./request-shelter.component.css']
})
export class RequestShelterComponent implements AfterViewInit, OnInit {
  mapboxAccessToken = environment.mapboxAccessToken;
  requestCoordinates: any;

  constructor(
    private sheltersService: SheltersService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(this.mapboxAccessToken);

    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/nsatellite-streets-v10',
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

    var personMarkerDiv = document.createElement('div');
    personMarkerDiv.style.backgroundImage = 'url("assets/person.png")';
    personMarkerDiv.style.width = '100px';
    personMarkerDiv.style.height = '100px';
    personMarkerDiv.style.backgroundRepeat = 'no-repeat'

    this.sheltersService.getShelterRequest()
      .subscribe(
        (res) => {
          this.requestCoordinates = res.lngLat;

          if (this.requestCoordinates) {
            new mapboxgl.Marker(personMarkerDiv)
              .setLngLat(this.requestCoordinates.split(','))
              .addTo(map);
          }
        },
        (err) => this.alertService.error(err)
      )

    map.on('click', function (e) {
      if (this.shelterMarker) {
        this.shelterMarker.remove();
      }

      this.shelterMarker = new mapboxgl.Marker(personMarkerDiv)
        .setLngLat(e.lngLat)
        .addTo(map);

      $('#lnglat').val(`${e.lngLat.lng},${e.lngLat.lat}`);
    });
  }

  submitRequest() {
    if (!$('#lnglat').val()) {
      this.alertService.errorWithMessage('Location is needed')
      return;
    }

    this.sheltersService.requestShelter($('#lnglat').val())
      .subscribe(
        (res) => this.alertService.success('Request submitted'),
        (err) => this.alertService.error(err)
      )
  }

  clearRequest() {
    this.sheltersService.requestShelter('')
      .subscribe(
        () => {
          this.alertService.success('Request cleared');
          window.location.reload();
        },
        (err) => this.alertService.error(err)
      );
  }
}
