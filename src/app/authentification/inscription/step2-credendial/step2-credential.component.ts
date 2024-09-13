import { Component } from '@angular/core';
import { UserInfoFormComponent } from '../../button/user-info/user-info.component';
import { MatFormField } from '@angular/material/form-field';


@Component({
  selector: 'app-inscription-step2',
  standalone: true,
  imports: [
    UserInfoFormComponent,
    UserInfoFormComponent,
    MatFormField
  ],
  templateUrl: './step2-credential.component.html',
  styleUrl: './step2-credential.component.css'
})
export class InscriptionStep2Component {

  onInput(inputElement: HTMLInputElement) {
    // Vous pouvez ajouter des logiques supplémentaires ici si nécessaire
    console.log(inputElement.value);
}
}
