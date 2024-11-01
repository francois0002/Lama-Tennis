import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
previousStep() {
    this.router.navigate(['/home-login/connexion']);
}
  email: string = '';
  password: string = '';
  errorMessage: string = ''; // Pour afficher un message d'erreur

  private authService = inject(AuthService);
  private router = inject(Router);

  // Méthode appelée lors de la soumission du formulaire
  resetPassword() {
    if (!this.email) {
      this.errorMessage = 'Veuillez entrer un email valide.';
      return;
    }
  
    this.authService.requestPasswordReset(this.email).subscribe({
      next: () => {
        this.router.navigate(['/home-login/send-mail-reset']);
      },
      error: (err) => {
        this.errorMessage = err.error.message || "Erreur lors de la réinitialisation du mot de passe";
      }
    });
  }
  

  // Méthode pour valider tous les champs
  isFormValid(): boolean {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    return emailPattern.test(this.email) && passwordPattern.test(this.password);
  }
}
