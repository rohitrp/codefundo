import { Component } from '@angular/core';
import { SEOService } from './_services/seo.service';
import { AuthService } from './_services/auth.service';

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
          this.user.verifiedMobile = true;
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
