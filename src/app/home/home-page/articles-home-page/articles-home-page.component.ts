import { Component, OnInit } from '@angular/core';
import { StandartButtonComponent } from '../../../form&button/standart-button/standart-button.component';
import { HelloWorldComponent } from '../../../hello-world/hello-world.component';
import { UserService } from '../../../service/user.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../service/auth.service';


@Component({
  selector: 'app-articles-home-page',
  standalone: true,
  imports: [StandartButtonComponent, HelloWorldComponent, CommonModule],
  templateUrl: './articles-home-page.component.html',
  styleUrl: './articles-home-page.component.css'
})
export class ArticlesHomePageComponent implements OnInit {
  user: any = {}; // Pour stocker les données de l'utilisateur
  club: any; // Pour stocker les informations du club

  constructor(private userService: UserService, private authservice: AuthService) {}

  ngOnInit(): void {
    const userId = this.authservice.getCurrentUserId(); // Remplacez par l'ID de l'utilisateur connecté

    if (userId) {
      // Récupérer les informations de l'utilisateur
      this.userService.getUserInfo(userId).subscribe(data => {
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
    this.userService.getClubInfo(clubId).subscribe(data => {
      this.club = data;
    });
  }
}

