import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { EmailService } from '../../service/email.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SendMailAdminDialogComponent } from './join-club-pop-up/send-mail-admin-pop-upcomponent';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent {
  userMessage: string = '';
  errorMessage: string = '';
  selectedSubject: string = "Demande d'informations";

  constructor(
    private emailService: EmailService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  contactAdmin() {
    const userEmail = this.authService.getUserEmail(); // Fecth the user email

    if (!userEmail) {
      this.errorMessage =
        "Votre email n'a pas pu être récupéré. Veuillez vérifier si vous êtes bien connecté.";
      return; 
    }
    if (!this.userMessage) {
      this.errorMessage = "Veuillez entrer un message avant de l'envoyer.";
      return;
    }

    this.emailService
      .sendEmailAdmin(userEmail, this.userMessage, this.selectedSubject)
      .subscribe(
        (response) => {
          console.log('Message envoyé avec succès', response);
          this.userMessage = '';
          this.errorMessage = ''; 
          this.openJoinClubDialog();
        },
        (error) => {
          console.error("Erreur lors de l'envoi du message", error);
          this.errorMessage =
            "Erreur lors de l'envoi du message. Veuillez réessayer plus tard.";
        }
      );
  }

  openJoinClubDialog(): void {
    const dialogRef = this.dialog.open(SendMailAdminDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('La boîte de dialogue a été fermée', result);
    });
  }
}
