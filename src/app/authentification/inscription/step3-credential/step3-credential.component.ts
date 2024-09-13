import { Component } from '@angular/core';
import { FormChoiceLevelComponent } from '../../button/form-choice-level/form-choice-level.component';
import { FormChoiceLevelRankingComponent } from '../../button/form-choice-level-ranking/form-choice-level-ranking.component';

@Component({
  selector: 'app-inscription-step3',
  standalone: true,
  imports:[
    FormChoiceLevelComponent,
    FormChoiceLevelRankingComponent
  ],
  templateUrl: './step3-credential.component.html',
  styleUrl: './step3-credential.component.css'
})
export class InscriptionStep3Component {

}
