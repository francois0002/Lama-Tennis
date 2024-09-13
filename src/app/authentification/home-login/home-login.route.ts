import { Routes } from '@angular/router';
import { InscriptionMainComponent } from '../inscription/inscription-main/inscription-main.component';
import { HomeLoginComponent } from './home-login.component';
import { InscriptionStep1Component } from '../inscription/step1-credential/step1-credential.component';
import { TestLoginComponent } from '../inscription/step0-home-login/step0-home-login.component';


export const homeLoginRoutes: Routes = [
  {
    path: '',
    component: HomeLoginComponent,
    children: [
      { path: 'inscription', component: InscriptionMainComponent },
      { path: 'step1', component: InscriptionStep1Component },
      { path: '', component: TestLoginComponent },
    ],
  },
];
