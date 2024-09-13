import { Component } from '@angular/core';
import { InscriptionStep3Component } from '../step3-credential/step3-credential.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { InscriptionStep1Component } from '../step1-credential/step1-credential.component';
import { InscriptionStep2Component } from '../step2-credendial/step2-credential.component';



@Component({
  selector: 'app-inscription-main',
  standalone: true,
  imports:[InscriptionStep1Component, ProgressBarComponent, InscriptionStep2Component, InscriptionStep3Component],
  templateUrl: './inscription-main.component.html',
  styleUrl: './inscription-main.component.css'



})
export class InscriptionMainComponent {

  currentStep = 1;

  nextStep() {
    this.currentStep++;
  }
  previousStep() {
    this.currentStep--;
  }

}

