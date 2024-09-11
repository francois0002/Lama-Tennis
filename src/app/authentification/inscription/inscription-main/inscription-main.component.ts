import { Component } from '@angular/core';
import { InscriptionStep2Component } from '../inscription-step2/inscription-step2.component';
import { InscriptionStep3Component } from '../inscription-step3/inscription-step3.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { InscriptionStep1Component } from '../step1-credential/step1-credential.component';



@Component({
  selector: 'app-inscription-main',
  standalone: true,
  imports:[InscriptionStep1Component, ProgressBarComponent, InscriptionStep2Component, InscriptionStep3Component],
  templateUrl: './inscription-main.component.html',
  styleUrl: './inscription-main.component.css'



})
export class InscriptionComponent {

  currentStep = 1;

  nextStep() {
    this.currentStep++;
  }
  previousStep() {
    this.currentStep--;
  }

}

