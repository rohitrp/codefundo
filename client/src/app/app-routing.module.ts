import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SheltersComponent } from './shelters/shelters.component';
import { AuthGuard } from './_guards/auth.guard';
import { RequestShelterComponent } from './request-shelter/request-shelter.component';

const routes: Routes = [
  { 
    path: 'signup', 
    component: SignupComponent,
    data: {
      title: 'Signup',
      metatags: {
        desciption: 'Relief Shelter Registration',
        keywords: ''
      }
    }
  },
  { 
    path: 'login', 
    component: LoginComponent,
    data: {
      title: 'Login',
      metatags: {
        desciption: 'Relief Shelter Registration',
        keywords: ''
      }
    }
  },
  { 
    path: 'shelters', 
    component: SheltersComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Shelters',
      metatags: {
        desciption: 'Relief Shelter Registration',
        keywords: ''
      }
    }
  },
  { 
    path: 'request', 
    component: RequestShelterComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Request a Shelter',
      metatags: {
        desciption: 'Request a Shelter',
        keywords: ''
      }
    }
  },
  { 
    path: '', 
    component: HomeComponent,
    data: {
      title: 'Home',
      metatags: {
        desciption: 'Relief Shelter Registration',
        keywords: ''
      }
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }