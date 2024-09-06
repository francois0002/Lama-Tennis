import { Component } from '@angular/core';
import { BackButtonComponent } from '../../button/back-button/back-button.component';
import { EmailButtonComponent } from '../../button/email-button/email-button.component';
import { PasswordButtonComponent } from '../../button/password-button/password-button.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';


@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [
    BackButtonComponent,
    EmailButtonComponent,
    PasswordButtonComponent,
    ProgressBarComponent
  ],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'


})
export class InscriptionComponent {
  currentStep = 1;
}
