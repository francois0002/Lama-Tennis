import { Component, HostListener, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatchService } from '../../service/match.service';
import { TrophyService } from '../../service/trophy.service';
import { NotificationService } from '../../service/notification.service'; // Importez le service de notification

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  notificationCount: number = 0; // Compteur de notifications

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private matchService: MatchService,
    private trophyService: TrophyService,
    private notificationService: NotificationService, // Ajoutez le service de notification
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId();

    if (userId) {
      this.userService.getUserInfo(userId).subscribe(data => {
        this.user = data;

        if (this.user.club) {
          this.fetchClubInfo(this.user.club);
        }
      });
    } else {
      console.error('User ID is null');
    }
  }

  fetchClubInfo(clubId: string): void {
    this.userService.getClubInfo(clubId).subscribe(clubData => {
      this.club = clubData;
      this.fetchPlayers(clubData.userIds);
    });
  }

  fetchPlayers(userIds: string[]): void {
    this.players = [];

    userIds.forEach(userId => {
      if (userId && userId !== this.user._id) {
        this.userService.getUserInfo(userId).subscribe(playerData => {
          this.players.push(playerData);
        });
      }
    });
  }

  filterPlayers(): void {
    const search = this.searchTerm.toLowerCase();
    this.filteredPlayers = this.players.filter(player =>
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

    if (inputElement && dropdownElement && !inputElement.contains(target) && !dropdownElement.contains(target)) {
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
      winner_id: this.score.player1 > this.score.player2 ? this.user._id : this.player2_id,
      date_add: new Date(),
    };

    this.matchService.saveMatchScore(matchData).subscribe(() => {
      console.log('Score enregistré avec succès');

      this.trophyService.checkTrophy(this.user._id).subscribe(
        (response) => {
          if (response && response.message && response.message.trim() !== '') {
            // Vérifiez si le message n'est pas vide
            this.notificationService.sendNotification(response.message); // Envoyez le message des trophées gagnés
            this.notificationCount++; // Incrémenter le compteur de notifications
          } else {
            // Pas de nouveaux trophées, ou le message est vide
            console.log('Aucun nouveau trophée gagné ou déjà acquis');
          }
        },
        (error) => {
          console.error('Erreur lors de la vérification des trophées', error);
        }
      );


      this.router.navigate(['/home']);
    }, (error) => {
      console.error('Erreur lors de l\'enregistrement du score', error);
    });
  }
}
