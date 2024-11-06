import { Component, inject } from '@angular/core';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { InscriptionStep1Component } from '../step1-credential/step1-credential.component';
import { InscriptionStep2Component } from '../step2-credendial/step2-credential.component';
import { InscriptionStep3Component } from '../step3-credendial/step3-credential.component';
import { BackButtonComponent } from '../../button/back-button/back-button.component';
import { Step0HomeLoginComponent } from '../../home-login/step0-home-login/step0-home-login.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SignUpService } from '../../../service/on-sign-up.service';
import { FormService } from '../../../service/form.service';

@Component({
  selector: 'app-inscription-main',
  standalone: true,
  imports: [
    InscriptionStep1Component,
    ProgressBarComponent,
    InscriptionStep2Component,
    BackButtonComponent,
    Step0HomeLoginComponent,
    InscriptionStep3Component,
    CommonModule,
  ],
  templateUrl: './inscription-main.component.html',
  styleUrl: './inscription-main.component.css',
})
export class InscriptionMainComponent {
  isStep1Valid = false; // Variable to track if step 1 is valid
  isStep2Valid = false; // Variable to track if step 2 is valid
  isStep3Valid = false; // Variable to track if step 3 is valid
  currentStep = 1;
  isEmailAvailable = true;

  constructor(private router: Router, private signUpService: SignUpService) {}

  // Method to update email availability
  updateEmailAvailability(isAvailable: boolean) {
    this.isEmailAvailable = isAvailable;
  }

  // Method to control the 'Next' button state
  canProceed(): boolean {
    if (this.currentStep === 1) {
      return this.isStep1Valid && this.isEmailAvailable; // // Validation du Step 1
    } else if (this.currentStep === 2) {
      return this.isStep2Valid; // Validation du Step 2
    } else if (this.currentStep === 3) {
      return this.isStep3Valid; // Validation du Step 3
    }

    return true;
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

  // Method will be called by child component to update step 1 validity
  updateStep1Validity(isValid: boolean) {
    this.isStep1Valid = isValid;
  }

  // Method will be called by child component to update step 2 validity
  updateStep2Validity(isValid: boolean) {
    this.isStep2Valid = isValid;
  }

  // Method will be called by child component to update step 3 validity
  updateStep3Validity(isValid: boolean) {
    this.isStep3Valid = isValid;
  }

  private service = inject(FormService);

  // Method to register the user
  register() {
    const formData = this.service.getFormData();
    console.log('Données à envoyer :', formData);

    this.signUpService.saveToDatabase(formData).subscribe({
      next: (response) => {
        console.log('Inscription réussie:', response);
        this.router.navigate(['/home-login/confirm-mail']);
      },
      error: (error) => {
        console.error("Erreur lors de l'inscription:", error);
        alert(
          "Une erreur est survenue lors de l'inscription. Veuillez vérifier vos informations et réessayer."
        );
      },
    });
  }
}
