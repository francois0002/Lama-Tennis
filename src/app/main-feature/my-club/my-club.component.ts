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
  imports: [CommonModule, MatDialogModule],
  templateUrl: './my-club.component.html',
  styleUrls: ['./my-club.component.css'],
})
export class MyClubComponent implements OnInit {
  user: any = {};
  club: any;
  players: any[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private clubsService: ClubService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId();

    if (userId) {
      // Fetch user info
      this.userService.getUserInfo(userId).subscribe((data) => {
        this.user = data;

        // Vcheck if the user has a club
        if (!this.user.club) {
          this.openJoinClubDialog(); // open the dialog to join a club
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

    // manage the dialog closing
    dialogRef.afterClosed().subscribe((result) => {
      console.log('La boîte de dialogue a été fermée', result);
    });
  }

  // fetch club info
  fetchClubInfo(clubId: string): void {
    this.clubsService.getClubInfo(clubId).subscribe((clubData) => {
      this.club = clubData;

      this.fetchPlayers(clubData.userIds);
    });
  }

  // fetch players
  fetchPlayers(userIds: string[]): void {
    this.players = [];

    userIds.forEach((userId) => {
      if (userId) {
        this.userService.getUserInfo(userId).subscribe((playerData) => {
          this.players.push(playerData);
        });
      }
    });
  }

  // function to leave a club
  leaveClub(): void {
    const userId = this.authService.getCurrentUserId();
    const clubId = this.user.club;

    if (userId) {
      // Mupdate user club
      this.userService.updateUserClub(userId, null).subscribe(
        (response) => {
          console.log('Response from server after leaving club:', response);

          // delete user from club
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
          );
        }
      );
    } else {
      console.error('User ID is null, cannot leave club.');
    }
  }

  capitalizeWords(text: string): string {
    if (!text) return '';
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
