import { Component, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit {

  constructor(
    public authService: AuthService
  ) { }

  ngAfterViewInit() {
    $(".navbar-burger").click(function () {

      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });
  }

}
