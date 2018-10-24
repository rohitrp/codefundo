import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';

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