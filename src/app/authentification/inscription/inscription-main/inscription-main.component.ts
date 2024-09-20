import { Component } from '@angular/core';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { InscriptionStep1Component } from '../step1-credential/step1-credential.component';
import { InscriptionStep2Component } from '../step2-credendial/step2-credential.component';
import { InscriptionStep3Component } from '../step3-credendial/step3-credential.component';
import { BackButtonComponent } from '../../button/back-button/back-button.component';
import { Step0HomeLoginComponent } from '../step0-home-login/step0-home-login.component';
import { Router } from '@angular/router';




@Component({
  selector: 'app-inscription-main',
  standalone: true,
  imports:[InscriptionStep1Component, ProgressBarComponent,
    InscriptionStep2Component, BackButtonComponent,
    Step0HomeLoginComponent, InscriptionStep3Component],
  templateUrl: './inscription-main.component.html',
  styleUrl: './inscription-main.component.css'



})
export class InscriptionMainComponent {

  isStep1Valid = false; // Variable to track if step 1 is valid
  currentStep = 1;

  constructor(private router: Router) {}

 // Method to control the 'Next' button state
 canProceed(): boolean {
  return this.currentStep === 1 ? this.isStep1Valid : true;
}
// Method to move to the next step
nextStep() {
  if (this.currentStep < 3 && this.canProceed()) {
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

    // This method will be called by child component to update step 1 validity
    updateStep1Validity(isValid: boolean) {
      this.isStep1Valid = isValid;
    }

}

