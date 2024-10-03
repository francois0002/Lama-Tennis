import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

  constructor(private userService: UserService, private authService: AuthService,private router: Router) {}

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

    // Fonction pour quitter le club
    leaveClub(): void {
      const userId = this.authService.getCurrentUserId(); // Récupérer l'ID de l'utilisateur
      const clubId = this.user.club; // Récupérer l'ID du club auquel l'utilisateur est associé

      console.log(`Attempting to leave club. User ID: ${userId}`);
      if (userId && clubId) {
        // Mettre à jour l'utilisateur pour supprimer le club
        this.userService.updateUserClub(userId, '').subscribe(
          (response) => {
            console.log('Response from server after leaving club:', response);

            // Supprimer l'utilisateur de la liste des membres du club
            this.userService.removeUserFromClub(clubId, userId).subscribe(
              () => {
                console.log('User successfully removed from club');
                this.router.navigate(['/home']);
              },
              (error) => {
                console.error('Erreur lors de la suppression de l\'utilisateur du club:', error);
              }
            );
          },
          (error) => {
            console.error('Erreur lors de la tentative de quitter le club:', error); // Log des erreurs
          }
        );
      } else {
        console.error('User ID or Club ID is null, cannot leave club.');
      }
    }


  capitalizeWords(text: string): string {
    if (!text) return ''; // Gérer les valeurs vides ou undefined
    return text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  navigateToJoinClub() {
    this.router.navigate(['/home/join-club']);
  }
}
