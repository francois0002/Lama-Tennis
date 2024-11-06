import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { ClubService } from '../../service/clubs-services';
import { StatsService } from '../../service/stats.service';

// Définition du type Match directement dans le fichier

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent {
  user: any = {}; // Contient les informations de l'utilisateur
  club: any; // Contient les informations du club
  players: any[] = []; // Contient la liste des joueurs
  statistics: any = {
    totalMatches: 0,
    wins: 0,
    losses: 0,
    winStreak: 0,
    bestWinStreak: 0,
  }; // Contient les statistiques de l'utilisateur
  matchHistory: any[] = []; // Pour stocker l'historique des matchs


  constructor(
    private userService: UserService,
    private clubService: ClubService,
    private authService: AuthService,
    private statsService: StatsService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId(); // Récupérer l'ID de l'utilisateur connecté

    if (userId) {
      // Récupérer les informations de l'utilisateur
      this.userService.getUserInfo(userId).subscribe((data) => {
        this.user = data;


        this.fetchUserStatistics(userId);
        this.fetchMatchHistory(userId);


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
    this.clubService.getClubInfo(clubId).subscribe((clubData) => {
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

  // Méthode pour récupérer les statistiques de l'utilisateur
  fetchUserStatistics(userId: string): void {
    this.statsService.getUserStatistics(userId).subscribe(
      (statistics) => {
        console.log('Statistiques récupérées :', statistics); // Ajout du log
        this.statistics = statistics;
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des statistiques :',
          error
        );
      }
    );
  }
    // Méthode pour récupérer l'historique des matchs
    fetchMatchHistory(userId: string): void {
      this.statsService.getUserMatchHistory(userId).subscribe(
        (history) => {
          this.matchHistory = history.sort((a: any, b: any)=> new Date(b.date_add).getTime() - new Date(a.date_add).getTime());
        },
        (error) => {
          console.error('Erreur lors de la récupération de l\'historique des matchs :', error);
        }
      );
    }

}
