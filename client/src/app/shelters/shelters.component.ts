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

    this.shelterService.getAllShelters()
      .subscribe(
        (res) => this.shelters = res,
        (err) => this.alertService.error(err)
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

}
