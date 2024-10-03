import { Component, OnInit } from '@angular/core';
import { StandartButtonComponent } from '../../../form&button/standart-button/standart-button.component';
import { HelloWorldComponent } from '../../../hello-world/hello-world.component';
import { UserService } from '../../../service/user.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles-home-page',
  standalone: true,
  imports: [StandartButtonComponent, HelloWorldComponent, CommonModule],
  templateUrl: './articles-home-page.component.html',
  styleUrl: './articles-home-page.component.css',
})
export class ArticlesHomePageComponent implements OnInit {
  user: any = {}; // Pour stocker les données de l'utilisateur
  club: any; // Pour stocker les informations du club

  constructor(
    private userService: UserService,
    private authservice: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authservice.getCurrentUserId(); // Remplacez par l'ID de l'utilisateur connecté

    if (userId) {
      // Récupérer les informations de l'utilisateur
      this.userService.getUserInfo(userId).subscribe((data) => {
        this.user = data;

        // Vérifiez si l'utilisateur a un club associé
        if (this.user.club) {
          this.fetchClubInfo(this.user.club);
        }
      });
    } else {
      console.error('User ID is null');
    }
  }

  // Fonction pour récupérer les informations du club
  fetchClubInfo(clubId: string): void {
    this.userService.getClubInfo(clubId).subscribe((data) => {
      this.club = data;
    });
  }

  capitalizeWords(text: string): string {
    if (!text) return ''; // Gérer les valeurs vides ou undefined

    return text
      .toLowerCase() // Convertir toute la chaîne en minuscules
      .split(' ') // Séparer la chaîne en mots
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliser la première lettre de chaque mot
      .join(' '); // Rejoindre les mots en une seule chaîne
  }

  navigateToPage(page: string) {
    this.router.navigate([page]);
  }
}
