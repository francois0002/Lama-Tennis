import { Component,Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-standart-button',
  standalone: true,
  imports: [],
  templateUrl: './standart-button.component.html',
  styleUrl: './standart-button.component.css',
})
export class StandartButtonComponent {
  @Input() buttonText: string = 'Cliquez-ici'; 
  @Input() navigateTo: string | null = null; 

  constructor(private router: Router) {}

  navigate() {
    if (this.navigateTo) {
      this.router.navigate([this.navigateTo]);
    }
  }
}
