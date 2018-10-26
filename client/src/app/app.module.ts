import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { AuthGuard } from './_guards/auth.guard';
import { AlertService } from './_services/alert.service';
import { SheltersComponent } from './shelters/shelters.component';
import { environment } from 'src/environments/environment.prod';
import { AddShelterComponent } from './shelters/add-shelter/add-shelter.component';
import { ShelterCardComponent } from './shelters/shelter-card/shelter-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    SheltersComponent,
    AddShelterComponent,
    ShelterCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          const user = JSON.parse(localStorage.getItem('user'));
          if (!user) return '';
          return user.token;
        },
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['localhost:3000/api/users/']
      }
    }),
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthGuard,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
