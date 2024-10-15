import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrophyService } from '../../service/trophy.service';




@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hauts-faits.component.html',
  styleUrl: './hauts-faits.component.css',
})
export class HautsFaitsComponent implements OnInit {
  user: any = {}; // Contient les informations de l'utilisateur
  club: any; // Contient les informations du club
  players: any[] = []; // Contient la liste des joueurs
  userMessage: string = ''; // Message saisi par l'utilisateur
  trophies: any[] = []; // Contient la liste des trophées disponibles
  unlockedTrophies: string[] = []; // Contient les trophées débloqués par l'utilisateur


  constructor(
    private userService: UserService,
    private authService: AuthService,
    private trophyService: TrophyService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId(); // Récupérer l'ID de l'utilisateur connecté

    if (userId) {
      // Récupérer les informations de l'utilisateur
      this.userService.getUserInfo(userId).subscribe((data) => {
        this.user = data;
        this.unlockedTrophies = this.user.trophies || []; // Trophées débloqués

        // Récupérer tous les trophées disponibles
        this.loadTrophies();

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

    // Charger tous les trophées
  loadTrophies(): void {
    this.trophyService.getAllTrophies().subscribe(data => {
      this.trophies = data;
    });
  }

  // Vérifier si un trophée est débloqué
  isTrophyUnlocked(trophyId: string): boolean {
    console.log('Trophées débloqués:', this.unlockedTrophies);
console.log('Tous les trophées:', this.trophies);
    return this.unlockedTrophies.includes(trophyId);
  }
}


