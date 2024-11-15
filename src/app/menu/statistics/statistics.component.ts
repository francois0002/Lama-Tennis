import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { ClubService } from '../../service/clubs-services';
import { StatsService } from '../../service/stats.service';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent {
  user: any = {};
  club: any;
  players: any[] = [];
  statistics: any = {
    totalMatches: 0,
    wins: 0,
    losses: 0,
    winStreak: 0,
    bestWinStreak: 0,
  };
  matchHistory: any[] = [];

  constructor(
    private userService: UserService,
    private clubService: ClubService,
    private authService: AuthService,
    private statsService: StatsService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId();

    if (userId) {
      this.userService.getUserInfo(userId).subscribe((data) => {
        this.user = data;

        this.fetchUserStatistics(userId);
        this.fetchMatchHistory(userId);

        if (this.user.club) {
          this.fetchClubInfo(this.user.club);
        }
      });
    } else {
      console.error('User ID is null');
    }
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
      if (userId) {
        this.userService.getUserInfo(userId).subscribe((playerData) => {
          this.players.push(playerData);
        });
      }
    });
  }

  // function to fetch user statistics
  fetchUserStatistics(userId: string): void {
    this.statsService.getUserStatistics(userId).subscribe(
      (statistics) => {
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
  // function to fetch user match history
  fetchMatchHistory(userId: string): void {
    this.statsService.getUserMatchHistory(userId).subscribe(
      (history) => {
        this.matchHistory = history.sort(
          (a: any, b: any) =>
            new Date(b.date_add).getTime() - new Date(a.date_add).getTime()
        );
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération de l'historique des matchs :",
          error
        );
      }
    );
  }
}
