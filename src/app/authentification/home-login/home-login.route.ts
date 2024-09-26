import { Routes } from '@angular/router';
import { InscriptionMainComponent } from '../inscription/inscription-main/inscription-main.component';
import { HomeLoginComponent } from './home-login.component';
import { Step0HomeLoginComponent } from './step0-home-login/step0-home-login.component';
import { UserLoginComponent } from '../user-login/user-login.component';
import { ForgotPasswordComponent } from '../user-login/forgot-password/forgot-password.component';




export const homeLoginRoutes: Routes = [
  {
    path: '',
    component: HomeLoginComponent,
    children: [
      { path: 'inscription', component: InscriptionMainComponent },
      { path: '', component: Step0HomeLoginComponent },
      { path: 'connexion', component: UserLoginComponent },
      { path: 'mot-de-passe-oublie', component: ForgotPasswordComponent },
    ],
  },
];
