import { Component, OnInit } from '@angular/core';
import { AlertService } from '../_services/alert.service';
import { Shelter } from './shelter';

@Component({
  selector: 'app-shelters',
  templateUrl: './shelters.component.html',
  styleUrls: ['./shelters.component.css']
})
export class SheltersComponent implements OnInit {

  tab = 1;
  shelters = [];
  shelter = new Shelter('', '', '', '', '');

  addShelter() {
    console.log(this.shelter);
  }
  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

}
