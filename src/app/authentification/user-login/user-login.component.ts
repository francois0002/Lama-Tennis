import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';  // Assurez-vous que le chemin est correct
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  standalone: true,
  imports : [FormsModule,CommonModule]
})
export class UserLoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; // Pour afficher un message d'erreur

  private authService = inject(AuthService);
  private router = inject(Router);

  previousStep() {
    this.router.navigate(['/inscription']);
}

  // Méthode appelée lors de la soumission du formulaire
  onLogin() {
    // Vérification de la validité du formulaire avant l'envoi
    if (this.isFormValid()) {
      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
          // Connexion réussie : stocker le token et rediriger vers /home
          this.authService.setToken(response.token);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          // En cas d'erreur, afficher un message
          console.log("erreur test");
          this.errorMessage = err.error.message || "Une erreur s'est produite lors de la connexion";
        }
      });
    } else {
      this.errorMessage = 'Veuillez entrer un email et un mot de passe valides.';
      console.log("erreur teset");
    }
  }

  // Méthode pour valider tous les champs
  isFormValid(): boolean {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    return emailPattern.test(this.email) && passwordPattern.test(this.password);
  }
}
