import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-back-button',
  standalone: true,
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.css'
})
export class BackButtonComponent {
  @Input() link: string = '#';
}
