import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailService } from '../service/email.service';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  userMessage: string = '';
  errorMessage: string = '';
  selectedSubject: string = 'Demande d\'informations'; // Valeur par défaut

  constructor(private emailService: EmailService, private authService : AuthService) {}

  contactAdmin() {
    const userEmail = this.authService.getUserEmail(); // Récupérer l'email de l'utilisateur connecté
    console.log(userEmail);

    if (!userEmail) {
      this.errorMessage = 'Votre email n\'a pas pu être récupéré. Veuillez vérifier si vous êtes bien connecté.';
      return; // Sortir de la fonction si l'email est null
    }
    if (!this.userMessage) {
      this.errorMessage = 'Veuillez entrer un message avant de l\'envoyer.';
      return;
    }

    this.emailService.sendEmailAdmin(userEmail, this.userMessage, this.selectedSubject).subscribe(
      (response) => {
        console.log('Message envoyé avec succès', response);
        this.userMessage = ''; // Réinitialiser le champ du message
        this.errorMessage = ''; // Réinitialiser le message d'erreur
      },
      (error) => {
        console.error('Erreur lors de l\'envoi du message', error);
        this.errorMessage = 'Erreur lors de l\'envoi du message. Veuillez réessayer plus tard.';
      }
    );
  }

}

