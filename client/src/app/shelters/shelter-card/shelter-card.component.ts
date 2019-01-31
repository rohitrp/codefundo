import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Shelter } from '../shelter';
import { SheltersService } from 'src/app/_services/shelters.service';
import { AlertService } from 'src/app/_services/alert.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-shelter-card',
  templateUrl: './shelter-card.component.html',
  styleUrls: ['./shelter-card.component.css']
})
export class ShelterCardComponent implements OnInit {
  @Input() shelter: Shelter;
  @Input() user: any;
  @Input() zipcodeStatus: any;
  @Output() updateUserDetails = new EventEmitter<any>();
  bingMapUrl = '';
  shelterStatus = 2;

  joinShelter() {
    this.shelterService.joinShelter(this.shelter['_id'])
      .subscribe(
        (res) => {
          this.alertService.success('Joined');
          this.updateUserDetails.emit(res);
        },
        (err) => this.alertService.error(err)
      );
  }

  leaveShelter() {
    this.shelterService.leaveShelter(this.shelter['_id'])
      .subscribe(
        (res) => {
          this.alertService.success('Left');
          this.updateUserDetails.emit(res);
        },
        (err) => this.alertService.error(err)
      );
  }
  
  constructor(
    private shelterService: SheltersService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    if ($.inArray(+this.shelter.zipcode, this.zipcodeStatus.dangerous) !== -1) {
      this.shelterStatus = 0;
    } else if ($.inArray(+this.shelter.zipcode, this.zipcodeStatus.warning) !== -1) {
      this.shelterStatus = 1;
    }

    this.bingMapUrl = `http://bing.com/maps/default.aspx?cp=${this.shelter.lngLat.split(',').reverse().join('~')}&sp=point.${this.shelter.lngLat.split(',').reverse().join('_')}_${this.shelter.name}_Shelter&lvl=15`
  }

}
