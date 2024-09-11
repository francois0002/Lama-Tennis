import {Component} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';


interface Level {
  value: string;
  viewValue: string;
}

/**
 * @title Select in a form
 */
@Component({
  selector: 'app-form-choice-level',
  templateUrl: './form-choice-level.component.html',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
})
export class FormChoiceLevelComponent {
  selectedValue: string;


  constructor() {
    this.selectedValue = '';
  }

  levels: Level[] = [
    {value: 'Debutant', viewValue: 'Débutant'},
    {value: 'Intermediaire', viewValue: 'Intermédiaire'},
    {value: 'confirme', viewValue: 'Confirmé'},
  ];
}
