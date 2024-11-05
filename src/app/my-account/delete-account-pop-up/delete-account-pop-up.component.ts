import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../service/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';


@Component({
  selector: 'delete-account-club-pop-up',
  templateUrl: './delete-account-pop-up.component.html',
  styleUrls: ['./delete-account-pop-up.component.css'],
  imports : [MatFormFieldModule, MatInputModule, CommonModule, FormsModule],
  standalone: true,
})
export class DeleteAccountDialogComponent {
  password: string = '';
  passwordError: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<DeleteAccountDialogComponent>,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  

  onDeleteAccount(): void {
    // Récupérer l'utilisateur connecté
    const user = this.authService.getUser();
    const userId = user ? user.id : null;
  
    if (!userId) {
      console.warn("L'ID de l'utilisateur est invalide ou null.");
      this.passwordError = "Erreur : ID de l'utilisateur introuvable.";
      return;
    }
  
    // Vérification du mot de passe en passant userId
    this.authService.validatePassword(userId, this.password).subscribe(
      (isValid) => {
        if (isValid) {
          // Supprimer l'utilisateur si l'ID est valide
          this.userService.deleteUser(userId).subscribe(
            () => {
              this.dialogRef.close();
              this.authService.logout();
              window.location.href = '/home-login'; // Redirige vers la page de connexion
            },
            (error) => {
              console.error("Erreur lors de la suppression du compte :", error);
              alert("Une erreur est survenue lors de la suppression de votre compte.");
            }
          );
        } else {
          this.passwordError = 'Mot de passe incorrect. Veuillez réessayer.';
        }
      },
      (error) => {
        this.passwordError = 'Une erreur est survenue lors de la vérification du mot de passe.';
      }
    );
  }
  

  onClose(): void {
    this.dialogRef.close();
  }
}
