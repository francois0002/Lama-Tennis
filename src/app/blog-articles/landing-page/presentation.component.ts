import { Component } from '@angular/core';

@Component({
  selector: 'app-lama-kesako',
  standalone: true,
  imports: [],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.css'
})
export class PresentationLamaTennisComponent {
  images = [

    {
      url: '/level/home.png',
      title: 'Page d\'accueil',
      description: 'Là où tout commence.'
    },
    {
      url: '/level/find-club.png',
      title: 'Trouve un club',
      description: 'Permet de s\'inscrire dans un club parmi une liste de 15 000 clubs partout en France.'
    },
    {
      url: '/level/partner.png',
      title: 'Partenaires',
      description: 'Trouve des autres joueurs de tennis au sein de ton club'
    },

    {
      url: '/level/result.png',
      title: 'Résultats',
      description: 'Enregistre les résultats des matchs joués'
    },

    {
      url: '/level/trophees.png',
      title: 'Trophées',
      description: 'Collection de trophées gagnés par le joueur suite à sa progression'
    },

    {
      url: '/level/stats.png',
      title: 'Statistiques',
      description: 'Vision sur les différentes statistiques du joueur et de son historique de matchs'
    },




  ];
  currentIndex = 0;

  moveSlide(step: number): void {
    this.currentIndex = (this.currentIndex + step + this.images.length) % this.images.length;
  }
}
