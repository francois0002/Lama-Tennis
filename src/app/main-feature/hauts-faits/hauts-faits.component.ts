import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrophyService } from '../../service/trophy.service';
import { ClubService } from '../../service/clubs-services';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hauts-faits.component.html',
  styleUrl: './hauts-faits.component.css',
})
export class HautsFaitsComponent implements OnInit {
  user: any = {};
  club: any;
  players: any[] = [];
  userMessage: string = '';
  trophies: any[] = [];
  unlockedTrophies: string[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private clubService: ClubService,
    private trophyService: TrophyService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId();

    if (userId) {
      // fetch user info
      this.userService.getUserInfo(userId).subscribe((data) => {
        this.user = data;
        this.unlockedTrophies = this.user.trophies || []; // unlock trophies

        // fetch all trophies
        this.loadTrophies();

        // check if the user has a club
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

  loadTrophies(): void {
    this.trophyService.getAllTrophies().subscribe((data) => {
      this.trophies = data;
    });
  }

  // check if a trophy is unlocked
  isTrophyUnlocked(trophyId: string): boolean {
    return this.unlockedTrophies.includes(trophyId);
  }
}
