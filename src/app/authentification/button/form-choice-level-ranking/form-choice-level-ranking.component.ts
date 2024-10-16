import {Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

interface Ranking {
  value: string;
  viewValue: string;
}

interface RankingGroup {
  disabled?: boolean;
  name: string;
  ranking: Ranking[];
}

/** @title Select with option groups */
@Component({
  selector: 'form-choice-level-ranking',
  templateUrl: 'form-choice-level-ranking.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatInputModule],
})
export class FormChoiceLevelRankingComponent {
  rankingControl = new FormControl('');
  rankingGroups: RankingGroup[] = [
    {
      name: 'Aucun classement',
      ranking: [
        {value: 'Aucun classement', viewValue: 'Aucun classement'},
      ],
    },


    {
      name: '4e série',
      ranking: [
        {value: '40', viewValue: '40'},
        {value: '30/5', viewValue: '30/5'},
        {value: '30/4', viewValue: '30/4'},
        {value: '30/3', viewValue: '30/3'},
        {value: '30/2', viewValue: '30/2'},
        {value: '30/1', viewValue: '30/1'},
      ],
    },
    {
      name: '3e série',
      ranking: [
        {value: '30', viewValue: '30'},
        {value: '15/5', viewValue: '15/5'},
        {value: '15/4', viewValue: '15/4'},
        {value: '15/3', viewValue: '15/3'},
        {value: '15/2', viewValue: '15/2'},
        {value: '15/1', viewValue: '15/1'},
      ],
    },
    {
      name: '2e série',
      ranking: [
        {value: '15', viewValue: '15'},
        {value: '5/6', viewValue: '5/6'},
        {value: '4/6', viewValue: '14/6'},
        {value: '3/6', viewValue: '3/6'},
        {value: '2/6', viewValue: '2/6'},
        {value: '1/6', viewValue: '1/6'},
        {value: '0', viewValue: '0'},
        {value: '-2/6', viewValue: '-2/6'},
        {value: '-4/6', viewValue: '-4/6'},
        {value: '-15', viewValue: '-15'},
      ],
    },
    {
      name: '1re série',
      ranking: [
        {value: '1re série', viewValue: '1re série'},
      ],
    },
  ];
}
