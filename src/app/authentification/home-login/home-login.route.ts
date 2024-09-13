import { Routes } from '@angular/router';
import { InscriptionMainComponent } from '../inscription/inscription-main/inscription-main.component';
import { HomeLoginComponent } from './home-login.component';
import { InscriptionStep1Component } from '../inscription/step1-credential/step1-credential.component';
import { Step0HomeLoginComponent } from '../inscription/step0-home-login/step0-home-login.component';
import { InscriptionStep2Component } from '../inscription/step2-credendial/step2-credential.component';
import { InscriptionStep3Component } from '../inscription/step3-credential/step3-credential.component';


export const homeLoginRoutes: Routes = [
  {
    path: '',
    component: HomeLoginComponent,
    children: [
      { path: 'inscription', component: InscriptionMainComponent },
      { path: 'step1', component: InscriptionStep1Component },
      { path: 'step2', component: InscriptionStep2Component },
      { path: 'step3', component: InscriptionStep3Component },
      { path: '', component: Step0HomeLoginComponent },
    ],
  },
];
