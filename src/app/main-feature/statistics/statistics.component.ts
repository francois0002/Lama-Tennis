import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';
import { MatchService } from '../../service/match.service';
import { CommonModule } from '@angular/common';

// Définition du type Match directement dans le fichier
interface Match {
  date: string; // Utiliser 'Date' si tu préfères un objet Date
  opponent: { name: string };
  result: string; // 'Victoire' ou 'Défaite'
  score: { player1: number; player2: number };
}

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
  matchHistory: any[] = []; // Contient l'historique des matchs

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private matchService: MatchService // Ajout du service MatchService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId(); // Récupérer l'ID de l'utilisateur connecté

    if (userId) {
      // Récupérer les informations de l'utilisateur
      this.userService.getUserInfo(userId).subscribe((data) => {
        this.user = data;

        this.fetchUserStatistics(userId);


      // Appeler la méthode pour récupérer l'historique des matchs ici
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
    this.userService.getClubInfo(clubId).subscribe((clubData) => {
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
    this.matchService.getUserStatistics(userId).subscribe(
      (statistics) => {
        console.log('Statistiques récupérées :', statistics); // Ajout du log
        this.statistics = statistics;
        this.matchHistory = []; // Assurez-vous que l'historique des matchs est réinitialisé

        // Si vous avez une méthode pour récupérer l'historique, appelez-la ici
        // this.fetchMatchHistory(userId);
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des statistiques :',
          error
        );
      }
    );
  }

   // Méthode pour récupérer l'historique des matchs de l'utilisateur
   fetchMatchHistory(userId: string): void {
    this.matchService.getUserMatchHistory(userId).subscribe(
      (matchHistory: Match[]) => { // Spécifie le type ici
        console.log('Historique des matchs récupéré :', matchHistory);
        this.matchHistory = matchHistory.sort((a: Match, b: Match) => new Date(b.date).getTime() - new Date(a.date).getTime());
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'historique des matchs :', error);
      }
    );
  }
}
