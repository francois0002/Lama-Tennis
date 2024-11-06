import { Routes } from '@angular/router';
import { InscriptionMainComponent } from '../inscription/inscription-main/inscription-main.component';
import { HomeLoginComponent } from './home-login.component';
import { Step0HomeLoginComponent } from './step0-home-login/step0-home-login.component';
import { UserLoginComponent } from '../user-login/user-login.component';
import { ForgotPasswordComponent } from '../user-login/forgot-password/forgot-password.component';
import { ConfirmMailComponent } from '../inscription/confirm-mail/confirm-mail.component';
import { ResetPasswordComponent } from '../user-login/forgot-password/reset-password-component/reset-password-component.component';
import { SendMailReset } from '../user-login/forgot-password/reset-password-component/message-validation/send-mail-reset/send-mail-reset.component';
import { ConfirmationPswdResetComponent } from '../user-login/forgot-password/reset-password-component/message-validation/confirmation-pswd-reset/confirmation-pswd-reset.component';




export const homeLoginRoutes: Routes = [
  {
    path: '',
    component: HomeLoginComponent,
    children: [
      { path: 'reset-password/:token', component: ResetPasswordComponent },
      { path: 'inscription', component: InscriptionMainComponent },
      { path: '', component: Step0HomeLoginComponent },
      { path: 'connexion', component: UserLoginComponent },
      { path: 'mot-de-passe-oublie', component: ForgotPasswordComponent },
      { path: 'confirm-mail', component: ConfirmMailComponent },
      { path: 'send-mail-reset', component: SendMailReset },
      { path: 'mail-reset', component: ConfirmationPswdResetComponent }


    ],
  },
];
