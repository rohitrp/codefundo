import { Component, OnInit } from '@angular/core';
import { AlertService } from '../_services/alert.service';
import { SheltersService } from '../_services/shelters.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-shelters',
  templateUrl: './shelters.component.html',
  styleUrls: ['./shelters.component.css']
})
export class SheltersComponent implements OnInit {
  tab = 0;
  shelters = [];
  user: any;
  zipcodeStatus = {};

  radius = 50;
  infantFriendly: any;
  elderFriendly: any;
  official: any;
  verified: any;

  constructor(
    private alertService: AlertService,
    private shelterService: SheltersService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getUserDetails()
      .subscribe(
        (res) => this.user = res,
        (err) => this.alertService.error(err)
      );

    this.shelterService.getLatLng()
      .subscribe(
        (res) => {
          this.shelterService.getAllShelters(res.latitude, res.longitude, this.radius)
            .subscribe(
              (res) => {
                res.sort(this.shelterSortFunc);
                this.shelters = res;
              },
              (err) => this.alertService.error(err)
            );
        }, 
        this.alertService.error
      );

    this.shelterService.getZipcodeStatus()
      .subscribe(
        (res) => this.zipcodeStatus = res[0],
        this.alertService.error
      );
  }

  updateUserDetails(user) {
    this.user = user;
  }

  getShelterScore(shelter) {
    var score = 0;

    if (this.infantFriendly && shelter.infantFriendly === '1') score++;
    if (this.elderFriendly && shelter.elderFriendly === '1') score++;
    if (this.official && shelter.official) score++;
    if (this.verified && shelter.verified) score++;

    return score;
  }

  shelterSortFunc(a, b) {
    var keyA = a['score'],
      keyB = b['score'];

    if (keyA < keyB) return 1;
    if (keyA > keyB) return -1;

    keyA = +a['distance'];
    keyB = +b['distance'];

    if (keyA < keyB) return -1;
    if (keyA > keyB) return +1;

    return 0;

  }

  updateSearchResults() {
    this.shelterService.getLatLng()
      .subscribe(
        (res) => {
          this.shelterService.getAllShelters(res.latitude, res.longitude, this.radius)
            .subscribe(
              (res) => {
                for (let i = 0; i < res.length; i++) {
                  res[i]['score'] = this.getShelterScore(res[i]);
                  console.log(res[i]);
                }

                res.sort(this.shelterSortFunc);

                this.shelters = res;
                console.log(this.shelters);

              },
              (err) => this.alertService.error(err)
            );
        },
        this.alertService.error
      );
  }

}
