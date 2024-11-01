import { Component } from '@angular/core';
import { AuthService } from '../../../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-reset-password-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password-component.component.html',
  styleUrl: './reset-password-component.component.css',
})
export class ResetPasswordComponent{
  token: string | null = null;
  newPassword = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  validatePassword(passwordInput: NgModel) {
    passwordInput.control.markAsTouched();
  
  }

  updatePassword() {
    const token = this.route.snapshot.paramMap.get('token');
    if (!token) {
      this.errorMessage = 'Token is missing';
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
      return;
    }
    this.authService.resetPassword(token, this.newPassword).subscribe({
      next: () => this.router.navigate(['/home-login/mail-reset']),
      error: (err) => {
        this.errorMessage =
          err.error.message || 'Erreur lors de la réinitialisation.';
      },
    });
  }
}
