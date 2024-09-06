import { Component } from '@angular/core';
import { BackButtonComponent } from '../../button/back-button/back-button.component';
import { UserInfoFormComponent } from '../../button/user-info/user-info.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { MatFormField } from '@angular/material/form-field';


@Component({
  selector: 'app-inscription-step2',
  standalone: true,
  imports: [
    BackButtonComponent,
    UserInfoFormComponent,
    ProgressBarComponent,
    UserInfoFormComponent,
    MatFormField
  ],
  templateUrl: './inscription-step2.component.html',
  styleUrl: './inscription-step2.component.css'
})
export class InscriptionStep2Component {
  currentStep: number = 2;

  onInput(inputElement: HTMLInputElement) {
    // Vous pouvez ajouter des logiques supplémentaires ici si nécessaire
    console.log(inputElement.value);
}
}
