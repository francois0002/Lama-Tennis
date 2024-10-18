import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.css',
})
export class PartnersComponent implements OnInit {
  user: any = {}; // Contient les informations de l'utilisateur
  club: any; // Contient les informations du club
  players: any[] = []; // Contient la liste des joueurs
  userMessage: string = ''; // Message saisi par l'utilisateur

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId(); // Récupérer l'ID de l'utilisateur connecté

    if (userId) {
      // Récupérer les informations de l'utilisateur
      this.userService.getUserInfo(userId).subscribe((data) => {
        this.user = data;

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

  // Fonction pour contacter tous les joueurs
  contactAllPlayers(): void {
    if (this.players.length < 2) {
      alert('Il doit y avoir au moins 2 joueurs dans le club pour envoyer un message.');
      return;
    }

    const emailSubject = `${this.user.firstName} ${this.user.lastName} recherche un partenaire !`;
    const emailBody = this.userMessage || `Le joueur ${this.user.firstName} recherche un partenaire, contacte-le pour lui proposer une partie !`;

    // Filtrer pour envoyer l'email aux autres joueurs (exclure l'utilisateur actuel)
    const recipientEmails = this.players
      .filter((player) => player._id !== this.user._id)
      .map((player) => player.email);

    if (recipientEmails.length === 0) {
      alert('Aucun autre joueur disponible pour recevoir ce message.');
      return;
    }

    // Appel pour envoyer l'email
    this.http
      .post('http://localhost:3000/send-email', {
        to: recipientEmails.join(','),
        subject: emailSubject,
        text: emailBody,
      })
      .subscribe(
        () => {
          alert('Message envoyé aux autres joueurs du club.');
        },
        (error) => {
          console.error('Erreur lors de l\'envoi des emails:', error);
          alert('Une erreur est survenue lors de l\'envoi des emails.');
        }
      );
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

  formatPhoneNumber(phoneNumber: string): string {
    if (!phoneNumber) return ''; // Si le numéro est vide ou null, on renvoie une chaîne vide
    return phoneNumber.replace(/(\d{2})(?=\d)/g, '$1 ');
  }

}
