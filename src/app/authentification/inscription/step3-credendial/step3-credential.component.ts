import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormChoiceLevelComponent } from '../../button/form-choice-level/form-choice-level.component';
import { FormChoiceLevelRankingComponent } from '../../button/form-choice-level-ranking/form-choice-level-ranking.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormService } from '../../../service/form.service';
import { CommonModule } from '@angular/common';

interface Level {
  value: string;
  viewValue: string;
}

interface Ranking {
  value: string;
  viewValue: string;
}

interface RankingGroup {
  disabled?: boolean;
  name: string;
  ranking: Ranking[];
}

@Component({
  selector: 'app-inscription-step3',
  standalone: true,
  imports: [
    FormChoiceLevelComponent,
    FormChoiceLevelRankingComponent,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './step3-credential.component.html',
  styleUrl: './step3-credential.component.css',
})
export class InscriptionStep3Component implements OnInit {
  @Output() validityChange = new EventEmitter<boolean>();

  level: string = '';
  ranking: string = '';
  rankingControl = new FormControl('');
  levelControl = new FormControl('');

  // List of available levels
  levels: Level[] = [
    { value: 'Débutant', viewValue: 'Débutant' },
    { value: 'Intermediaire', viewValue: 'Intermédiaire' },
    { value: 'Confirmé', viewValue: 'Confirmé' },
  ];

  // List of ranking groups with available rankings for each group
  rankingGroups: RankingGroup[] = [
    {
      name: 'Aucun classement',
      ranking: [{ value: 'Aucun classement', viewValue: 'Aucun classement' }],
    },
    {
      name: '4e série',
      ranking: [
        { value: '40', viewValue: '40' },
        { value: '30/5', viewValue: '30/5' },
        { value: '30/4', viewValue: '30/4' },
        { value: '30/3', viewValue: '30/3' },
        { value: '30/2', viewValue: '30/2' },
        { value: '30/1', viewValue: '30/1' },
      ],
    },
    {
      name: '3e série',
      ranking: [
        { value: '30', viewValue: '30' },
        { value: '15/5', viewValue: '15/5' },
        { value: '15/4', viewValue: '15/4' },
        { value: '15/3', viewValue: '15/3' },
        { value: '15/2', viewValue: '15/2' },
        { value: '15/1', viewValue: '15/1' },
      ],
    },
    {
      name: '2e série',
      ranking: [
        { value: '15', viewValue: '15' },
        { value: '5/6', viewValue: '5/6' },
        { value: '4/6', viewValue: '14/6' },
        { value: '3/6', viewValue: '3/6' },
        { value: '2/6', viewValue: '2/6' },
        { value: '1/6', viewValue: '1/6' },
        { value: '0', viewValue: '0' },
        { value: '-2/6', viewValue: '-2/6' },
        { value: '-4/6', viewValue: '-4/6' },
        { value: '-15', viewValue: '-15' },
      ],
    },
    {
      name: '1re série',
      ranking: [{ value: '1re série', viewValue: '1re série' }],
    },
  ];

  constructor(private formService: FormService) {}

  ngOnInit() {
    const formData = this.formService.getFormData();
    this.level = formData.level;
    this.rankingControl.setValue(formData.ranking);
    this.emitFormValidity();
  }

  // Method called when a level is selected
  onLevelSelected(level: string) {
    this.level = level;
    this.formService.updateForm({ level });
    this.emitFormValidity();
  }

  // Method called when the ranking selection is changed
  onRankingChange() {
    this.formService.updateForm({ ranking: this.rankingControl.value });
    this.emitFormValidity();
  }

  // Emits the form validity based on whether both level and ranking are selected
  emitFormValidity() {
    const isValid =
      this.levelControl.value !== '' && this.rankingControl.value !== '';
    this.validityChange.emit(isValid);
  }
}
