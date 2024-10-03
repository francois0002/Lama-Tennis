import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-club',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-club.component.html',
  styleUrls: ['./my-club.component.css'],

})
export class MyClubComponent implements OnInit {
  user: any = {}; // Contient les informations de l'utilisateur
  club: any; // Contient les informations du club
  players: any[] = []; // Contient la liste des joueurs

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId(); // Récupérer l'ID de l'utilisateur connecté

    if (userId) {
      // Récupérer les informations de l'utilisateur
      this.userService.getUserInfo(userId).subscribe(data => {
        this.user = data;

        // Vérifier si l'utilisateur est associé à un club
        if (this.user.club) {
          this.fetchClubInfo(this.user.club);
        }
      });
    } else {
      console.error('User ID is null');
    }
  }

  // Récupérer les informations du club
  fetchClubInfo(clubId: string): void {
    this.userService.getClubInfo(clubId).subscribe(clubData => {
      this.club = clubData;

      // Récupérer les joueurs associés au club
      this.fetchPlayers(clubData.userIds);
    });
  }

  // Récupérer la liste des joueurs du club
  fetchPlayers(userIds: string[]): void {
    this.players = []; // Réinitialiser la liste des joueurs

    userIds.forEach(userId => {
      if (userId) {  // Vérifier que l'ID n'est pas null
        this.userService.getUserInfo(userId).subscribe(playerData => {
          this.players.push(playerData);  // Ajouter chaque joueur récupéré à la liste
        });
      }
    });
  }

  capitalizeWords(text: string): string {
    if (!text) return ''; // Gérer les valeurs vides ou undefined
    return text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
