import { Component, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { environment } from 'src/environments/environment';
import { SheltersService } from '../_services/shelters.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  mapboxAccessToken = environment.mapboxAccessToken;

  constructor(
    private sheltersService: SheltersService,
    private alertService: AlertService
  ) { }

  ngAfterViewInit() {
    Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(this.mapboxAccessToken);

    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/satellite-streets-v10',
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

    this.sheltersService.getAllShelters(72,72,50)
      .subscribe(
        (res) => {
          var i = 0;
          for (i = 0; i < res.length; i++) {
            var shelterMarkerDiv = document.createElement('div');
            shelterMarkerDiv.style.backgroundImage = 'url("assets/shelter.png")';
            shelterMarkerDiv.style.width = '64px';
            shelterMarkerDiv.style.height = '64px';
            shelterMarkerDiv.style.backgroundRepeat = 'no-repeat'

            const shelter = res[i];

            new mapboxgl.Marker(shelterMarkerDiv)
              .setLngLat(shelter.lngLat.split(','))
              .setPopup(
                new mapboxgl.Popup({ offset: 25 }) // add popups
                  .setHTML('<h3 class="subtitle">' + shelter.name + '</h3><p>' + shelter.contact + '</p>')
              )
              .addTo(map);
          }
        },
        (err) => this.alertService.error(err)
      );

    // this.sheltersService.getAllSheltersRequests()
    //   .subscribe(
    //     (res) => {
    //       var i = 0;
    //       for (i = 0; i < res.length; i++) {
    //         var personMarkerDiv = document.createElement('div');
    //         personMarkerDiv.style.backgroundImage = 'url("assets/person.png")';
    //         personMarkerDiv.style.width = '100px';
    //         personMarkerDiv.style.height = '100px';
    //         personMarkerDiv.style.backgroundRepeat = 'no-repeat'

    //         const userShelterRequest = res[i];

    //         if (!userShelterRequest.shelterRequestLngLat) {
    //           continue;
    //         }

    //         new mapboxgl.Marker(personMarkerDiv)
    //           .setLngLat(userShelterRequest.shelterRequestLngLat.split(','))
    //           .addTo(map);
    //       }
    //     },
    //     (err) => this.alertService.error(err)
    //   );
  }

}
