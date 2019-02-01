import { Component } from '@angular/core';
import { SEOService } from './_services/seo.service';
import { AuthService } from './_services/auth.service';
import { LoaderComponent } from './loader/loader.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'relief-shelter';
  user: any;
  otp: any;
  otpGenerated = false;
  loader = LoaderComponent;

  constructor(
    private seoService: SEOService,
    public authService: AuthService
  ) {
    this.seoService.addSeoData();
  }

  generateOtp() {
    this.authService.generateOtp()
      .subscribe(
        (res) => {
          this.otpGenerated = true;

        }
      )
  }
  verifyOtp() {
    this.authService.verifyOtp(this.otp)
      .subscribe(
        (res) => {
          this.authService.refreshToken();
        }
      )

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this.authService.isAuthenticated()) {
      this.authService.getUserDetails()
        .subscribe(
          (res) => {
            this.user = res;
          }
        )
    }
  }
}
