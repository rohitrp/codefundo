import { Component, OnInit, Input } from '@angular/core';
import { Shelter } from '../shelter';

@Component({
  selector: 'app-shelter-card',
  templateUrl: './shelter-card.component.html',
  styleUrls: ['./shelter-card.component.css']
})
export class ShelterCardComponent implements OnInit {
  @Input() shelter: Shelter;

  constructor() { }

  ngOnInit() {
  }

}
