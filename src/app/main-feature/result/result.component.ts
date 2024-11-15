import { Component, HostListener, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatchService } from '../../service/match.service';
import { TrophyService } from '../../service/trophy.service';
import { NotificationService } from '../../service/notification.service'; // Importez le service de notification
import { ClubService } from '../../service/clubs-services';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { JoinClubDialogComponent } from '../../footer/join-club-pop-up/join-club-pop-up.component';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  club: any;
  user: any = {};
  players: any[] = [];
  score = { player1: 0, player2: 0 };
  player2_id: string = '';
  searchTerm: string = '';
  filteredPlayers: any[] = [];
  errorMessage: string | null = null;
  notificationCount: number = 0;

  constructor(
    private userService: UserService,
    private clubService: ClubService,
    private authService: AuthService,
    private matchService: MatchService,
    private trophyService: TrophyService,
    private notificationService: NotificationService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId();

    if (userId) {
      this.userService.getUserInfo(userId).subscribe((data) => {
        this.user = data;

        if (!this.user.club) {
          this.openJoinClubDialog();
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

    dialogRef.afterClosed().subscribe((result) => {
      console.log('La boîte de dialogue a été fermée', result);
    });
  }

  fetchClubInfo(clubId: string): void {
    this.clubService.getClubInfo(clubId).subscribe((clubData) => {
      this.club = clubData;
      this.fetchPlayers(clubData.userIds);
    });
  }

  fetchPlayers(userIds: string[]): void {
    this.players = [];

    userIds.forEach((userId) => {
      if (userId && userId !== this.user._id) {
        this.userService.getUserInfo(userId).subscribe((playerData) => {
          this.players.push(playerData);
        });
      }
    });
  }

  filterPlayers(): void {
    const search = this.searchTerm.toLowerCase();
    this.filteredPlayers = this.players.filter((player) =>
      player.firstName.toLowerCase().includes(search)
    );
  }

  selectPlayer(player: any): void {
    this.player2_id = player._id;
    this.searchTerm = `${player.firstName} ${player.lastName}`;
    this.filteredPlayers = [];
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const inputElement = document.querySelector('input[type="text"]');
    const dropdownElement = document.querySelector('.autocomplete-list');

    if (
      inputElement &&
      dropdownElement &&
      !inputElement.contains(target) &&
      !dropdownElement.contains(target)
    ) {
      this.filteredPlayers = [];
    }
  }

  saveMatchScore(): void {
    if (!this.player2_id) {
      this.errorMessage = 'Erreur : ajoute un joueur 2';
      return;
    }

    if (this.score.player1 === this.score.player2) {
      this.errorMessage = 'Erreur : le match nul n’est pas enregistrable.';
      return;
    }

    const matchData = {
      player1_id: this.user._id,
      player2_id: this.player2_id,
      score: this.score,
      winner_id:
        this.score.player1 > this.score.player2
          ? this.user._id
          : this.player2_id,
      date_add: new Date(),
    };

    this.matchService.saveMatchScore(matchData).subscribe(
      () => {
        this.trophyService.checkTrophy(this.user._id).subscribe(
          (response) => {
            if (
              response &&
              response.message &&
              response.message.trim() !== '' &&
              !response.message.includes('Aucun nouveau trophée gagné')
            ) {
              this.notificationService.sendNotification(response.message);
              this.notificationCount++;
            } else {
              console.log('Aucun nouveau trophée gagné ou déjà acquis');
            }
          },
          (error) => {
            console.error('Erreur lors de la vérification des trophées', error);
          }
        );

        this.router.navigate(['/home']);
      },
      (error) => {
        console.error("Erreur lors de l'enregistrement du score", error);
      }
    );
  }
}
