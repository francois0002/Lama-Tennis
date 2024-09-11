import { Component } from '@angular/core';
import { BackButtonComponent } from '../../button/back-button/back-button.component';
import { FormChoiceLevelComponent } from '../../button/form-choice-level/form-choice-level.component';
import { FormChoiceLevelRankingComponent } from '../../button/form-choice-level-ranking/form-choice-level-ranking.component';

@Component({
  selector: 'app-inscription-step3',
  standalone: true,
  imports:[
    BackButtonComponent,
    FormChoiceLevelComponent,
    FormChoiceLevelRankingComponent
  ],
  templateUrl: './inscription-step3.component.html',
  styleUrl: './inscription-step3.component.css'
})
export class InscriptionStep3Component {

}
