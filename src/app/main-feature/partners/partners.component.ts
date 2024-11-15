import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClubService } from '../../service/clubs-services';
import { EmailService } from '../../service/email.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { JoinClubDialogComponent } from '../../footer/join-club-pop-up/join-club-pop-up.component';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.css',
})
export class PartnersComponent implements OnInit {
  user: any = {};
  club: any;
  players: any[] = [];
  userMessage: string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private clubService: ClubService,
    private emailService: EmailService,
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

  // fetch club info
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

  contactAllPlayers(): void {
    if (this.players.length < 2) {
      alert(
        'Il doit y avoir au moins 2 joueurs dans le club pour envoyer un message.'
      );
      return;
    }

    const emailSubject = `${this.user.firstName} ${this.user.lastName} recherche un partenaire !`;
    const emailBody =
      this.userMessage ||
      `Le joueur ${this.user.firstName} recherche un partenaire, contacte-le pour lui proposer une partie !`;

    // filter out the current user from the list of players
    const recipientEmails = this.players
      .filter((player) => player._id !== this.user._id)
      .map((player) => player.email);

    if (recipientEmails.length === 0) {
      alert('Aucun autre joueur disponible pour recevoir ce message.');
      return;
    }

    // Use the email service to send the email to all players
    this.emailService
      .sendEmailAll(recipientEmails, emailSubject, emailBody)
      .subscribe(
        () => {
          alert('Message envoyé aux autres joueurs du club.');
        },
        (error) => {
          console.error("Erreur lors de l'envoi des emails:", error);
          alert("Une erreur est survenue lors de l'envoi des emails.");
        }
      );
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

  formatPhoneNumber(phoneNumber: string): string {
    if (!phoneNumber) return '';
    return phoneNumber.replace(/(\d{2})(?=\d)/g, '$1 ');
  }
}
