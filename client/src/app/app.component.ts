import { Component } from '@angular/core';
import { SEOService } from './_services/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'relief-shelter';

  constructor(
    private seoService: SEOService
  ) {
    this.seoService.addSeoData();
  }
}
