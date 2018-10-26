import { Component, OnInit } from '@angular/core';
import { AlertService } from '../_services/alert.service';
import { SheltersService } from '../_services/shelters.service';

@Component({
  selector: 'app-shelters',
  templateUrl: './shelters.component.html',
  styleUrls: ['./shelters.component.css']
})
export class SheltersComponent implements OnInit {
  tab = 0;
  shelters = [];

  constructor(
    private alertService: AlertService,
    private shelterService: SheltersService
  ) { }

  ngOnInit() {
    this.shelterService.getAllShelters()
      .subscribe(
        (res) => this.shelters = res,
        (err) => this.alertService.error(err)
      )
  }

}
