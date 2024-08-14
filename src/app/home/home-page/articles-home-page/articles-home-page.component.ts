import { Component } from '@angular/core';
import { StandartButtonComponent } from '../../../form&button/standart-button/standart-button.component';


@Component({
  selector: 'app-articles-home-page',
  standalone: true,
  imports: [StandartButtonComponent],
  templateUrl: './articles-home-page.component.html',
  styleUrl: './articles-home-page.component.css'
})
export class ArticlesHomePageComponent {

}
