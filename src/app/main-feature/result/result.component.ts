import { Component, HostListener, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatchService } from '../../service/match.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, FormsModule], // Ajout du FormsModule pour ngModel
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  club: any; // Contient les informations du club
  user: any = {}; // Contient les informations de l'utilisateur connecté (joueur 1)
  players: any[] = []; // Liste des membres du club pour sélectionner le joueur 2
  score = { player1: 0, player2: 0 }; // Scores des deux joueurs
  player2_id: string = ''; // ID du joueur 2 sélectionné
  searchTerm: string = ''; // Termes de recherche pour Joueur 2
  filteredPlayers: any[] = []; // Liste des joueurs filtrés
  errorMessage: string | null = null; // Variable pour le message d'erreur

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private matchService: MatchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId(); // Récupérer l'ID de l'utilisateur connecté

    if (userId) {
      this.userService.getUserInfo(userId).subscribe(data => {
        this.user = data; // L'utilisateur connecté est joueur 1

        if (this.user.club) {
          this.fetchClubInfo(this.user.club); // Récupérer les membres du club
        }
      });
    } else {
      console.error('User ID is null');
    }
  }

  // Récupérer les informations du club et les membres
  fetchClubInfo(clubId: string): void {
    this.userService.getClubInfo(clubId).subscribe(clubData => {
      this.club = clubData;

      // Récupérer les membres du club (joueurs)
      this.fetchPlayers(clubData.userIds);
    });
  }

  // Récupérer la liste des membres du club
  fetchPlayers(userIds: string[]): void {
    this.players = []; // Réinitialiser la liste des joueurs

    userIds.forEach(userId => {
      if (userId && userId !== this.user._id) {  // Exclure l'utilisateur connecté de la liste
        this.userService.getUserInfo(userId).subscribe(playerData => {
          this.players.push(playerData);  // Ajouter chaque joueur récupéré à la liste
        });
      }
    });
  }

    // Filtrer les joueurs en fonction du terme de recherche
    filterPlayers(): void {
      const search = this.searchTerm.toLowerCase();
      this.filteredPlayers = this.players.filter(player =>
        player.firstName.toLowerCase().includes(search)
      );
    }

  // Sélectionner un joueur dans la liste filtrée
  selectPlayer(player: any): void {
    this.player2_id = player._id;
    this.searchTerm = `${player.firstName} ${player.lastName}`; // Afficher le nom complet dans le champ de recherche
    this.filteredPlayers = []; // Cacher la liste après sélection
  }

   // Écouteur d'événement pour détecter les clics en dehors
   @HostListener('document:click', ['$event'])
   handleClick(event: MouseEvent): void {
     const target = event.target as HTMLElement;
     const inputElement = document.querySelector('input[type="text"]');
     const dropdownElement = document.querySelector('.autocomplete-list');

     // Ferme la liste si l'utilisateur clique en dehors de l'input ou de la liste
     if (inputElement && dropdownElement && !inputElement.contains(target) && !dropdownElement.contains(target)) {
       this.filteredPlayers = []; // Vide la liste
     }
   }


  // Enregistrer le score du match
  saveMatchScore(): void {

    if (!this.player2_id) {
      this.errorMessage = 'Erreur : ajoute un joueur 2';
      return; // Ne pas soumettre le formulaire
    }

    if (this.score.player1 === this.score.player2) {
      this.errorMessage = 'Erreur : le match nul n’est pas enregistrable.';
      return; // Ne pas envoyer le score à la base de données
    }

    const matchData = {
      player1_id: this.user._id, // Joueur 1 est l'utilisateur connecté
      player2_id: this.player2_id, // Joueur 2 sélectionné
      score: this.score, // Scores des deux joueurs
      winner_id: this.score.player1 > this.score.player2 ? this.user._id : this.player2_id,
      date_add: new Date(),
    };

    this.matchService.saveMatchScore(matchData).subscribe(() => {
      console.log('Score enregistré avec succès');
      this.router.navigate(['/home']); // Rediriger après l'enregistrement du score
    }, (error) => {
      console.error('Erreur lors de l\'enregistrement du score', error);
    });
  }
}
