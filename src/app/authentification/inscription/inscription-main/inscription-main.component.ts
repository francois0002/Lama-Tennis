import { Component } from '@angular/core';
import { InscriptionStep3Component } from '../step3-credential/step3-credential.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { InscriptionStep1Component } from '../step1-credential/step1-credential.component';
import { InscriptionStep2Component } from '../step2-credendial/step2-credential.component';
import { BackButtonComponent } from '../../button/back-button/back-button.component';
import { Step0HomeLoginComponent } from '../step0-home-login/step0-home-login.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-inscription-main',
  standalone: true,
  imports:[InscriptionStep1Component, ProgressBarComponent,
    InscriptionStep2Component, InscriptionStep3Component, BackButtonComponent,
    Step0HomeLoginComponent],
  templateUrl: './inscription-main.component.html',
  styleUrl: './inscription-main.component.css'



})
export class InscriptionMainComponent {

  currentStep = 1;

  constructor(private router: Router) {}

  // forbid the user to go to a step that is not on the limit
  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  // redirect to home-login page if the user is on the first step
  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    } else {
      this.router.navigate(['/home-login']);
    }
  }
}

