import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-standart-button',
  standalone: true,
  imports: [],
  templateUrl: './standart-button.component.html',
  styleUrl: './standart-button.component.css',
})
export class StandartButtonComponent {
  @Input() buttonText: string = 'Cliquez-ici'; // Texte par défaut
}
