import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClubService } from '../../service/clubs-services';
import { JoinClubDialogComponent } from '../../footer/join-club-pop-up/join-club-pop-up.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-my-club',
  standalone: true,
  imports: [CommonModule,MatDialogModule],
  templateUrl: './my-club.component.html',
  styleUrls: ['./my-club.component.css'],
})
export class MyClubComponent implements OnInit {
  user: any = {}; // Contient les informations de l'utilisateur
  club: any; // Contient les informations du club
  players: any[] = []; // Contient la liste des joueurs

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private clubsService: ClubService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId(); // Récupérer l'ID de l'utilisateur connecté

    if (userId) {
      // Récupérer les informations de l'utilisateur
      this.userService.getUserInfo(userId).subscribe((data) => {
        this.user = data;

        // Vérifier si l'utilisateur est associé à un club
        if (!this.user.club) {
          this.openJoinClubDialog(); // Ouvre la boîte de dialogue si l'utilisateur n'a pas de club
        } else {
          this.fetchClubInfo(this.user.club);
        }
      });
    } else {
      console.error('User ID is null');
    }
  }

  openJoinClubDialog(): void {
    const dialogRef = this.dialog.open(JoinClubDialogComponent, {
      width: '300px',
    });

    // Gérer la fermeture de la boîte de dialogue si besoin
    dialogRef.afterClosed().subscribe((result) => {
      console.log('La boîte de dialogue a été fermée', result);
    });
  }



  // Récupérer les informations du club
  fetchClubInfo(clubId: string): void {
    this.clubsService.getClubInfo(clubId).subscribe((clubData) => {
      this.club = clubData;

      // Récupérer les joueurs associés au club
      this.fetchPlayers(clubData.userIds);
    });
  }

  // Récupérer la liste des joueurs du club
  fetchPlayers(userIds: string[]): void {
    this.players = []; // Réinitialiser la liste des joueurs

    userIds.forEach((userId) => {
      if (userId) {
        // Vérifier que l'ID n'est pas null
        this.userService.getUserInfo(userId).subscribe((playerData) => {
          this.players.push(playerData); // Ajouter chaque joueur récupéré à la liste
        });
      }
    });
  }

  // Fonction pour quitter le club
  leaveClub(): void {
    const userId = this.authService.getCurrentUserId(); // Récupérer l'ID de l'utilisateur
    const clubId = this.user.club; // Récupérer l'ID du club auquel l'utilisateur est associé

    console.log(`Attempting to leave club. User ID: ${userId}`);
    if (userId) {
      // Mettre à jour l'utilisateur pour supprimer le club
      this.userService.updateUserClub(userId, null).subscribe(
        (response) => {
          console.log('Response from server after leaving club:', response);

          // Supprimer l'utilisateur de la liste des membres du club
          if (clubId) {
            this.clubsService.removeUserFromClub(clubId, userId).subscribe(
              () => {
                console.log('User successfully removed from club');
                this.router.navigate(['/home']);
              },
              (error) => {
                console.error(
                  "Erreur lors de la suppression de l'utilisateur du club:",
                  error
                );
              }
            );
          } else {
            console.error('Club ID is null, cannot remove user from club.');
          }
        },
        (error) => {
          console.error(
            'Erreur lors de la tentative de quitter le club:',
            error
          ); // Log des erreurs
        }
      );
    } else {
      console.error('User ID is null, cannot leave club.');
    }
  }

  capitalizeWords(text: string): string {
    if (!text) return ''; // Gérer les valeurs vides ou undefined
    return text
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  navigateToJoinClub() {
    this.router.navigate(['/home/join-club']);
  }
  navigateToPartners() {
    this.router.navigate(['/home/partners'], { fragment: 'contacts-section' });
  }
}
