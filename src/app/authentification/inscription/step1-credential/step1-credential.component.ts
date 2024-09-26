import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { EmailButtonComponent } from '../../button/email-button/email-button.component';
import { PasswordButtonComponent } from '../../button/password-button/password-button.component';
import { FormService } from '../../../service/form.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from '../../user-login/user-login.component';
import { EmailService } from '../../../service/email.service';

@Component({
  selector: 'app-inscription-step1',
  standalone: true,
  imports: [
    EmailButtonComponent,
    PasswordButtonComponent,
    FormsModule,
    CommonModule,
    UserLoginComponent,
  ],
  templateUrl: './step1-credential.component.html',
  styleUrls: ['./step1-credential.component.css']
})
export class InscriptionStep1Component implements OnInit {

  @Input() email: string = '';
  @Input() password: string = '';
  @Output() validityChange = new EventEmitter<boolean>();  // Output event to notify parent
  emailError: string = '';

  constructor(private service: FormService, private emailService: EmailService) {}  // Injection du service EmailService

  ngOnInit() {
    // Récupérer les données du formulaire depuis le service et initialiser les propriétés
    const formData = this.service.getFormData();
    this.email = formData.email;
    this.password = formData.password;
  }

  // Méthode appelée lorsqu'il y a un changement dans l'email
  updateEmail(newEmail: string) {
    this.email = newEmail;
    this.service.updateForm({ email: this.email });
  }

  // Méthode appelée lorsqu'il y a un changement dans le mot de passe
  updatePassword(newPassword: string) {
    this.password = newPassword;
    this.service.updateForm({ password: this.password });
  }
  // Méthode pour valider tous les champs
  isFormValid(): boolean {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    return emailPattern.test(this.email) && passwordPattern.test(this.password);
  }

  onEmailBlur(emailInput: NgModel) {
    this.validateEmail(emailInput);  // D'abord, valider le format d'email
    if (emailInput.valid && this.email) {
      this.checkEmailAvailability(this.email);  // Puis vérifier si l'email est déjà utilisé
    }
  }

  // Utilisation du service pour vérifier si l'email est disponible
  checkEmailAvailability(email: string) {

    console.log('Vérification de l\'email:', email);
    this.emailService.checkEmail(email).subscribe({
      next: (response) => {
        this.emailError = '';  // Si l'email est disponible, réinitialiser l'erreur
        this.emitFormValidity();
      },
      error: (err) => {
        if (err.status === 400) {
          this.emailError = err.error.message;  // Afficher le message d'erreur
        } else {
          console.error("Erreur lors de la vérification de l'email:", err);
        }
        this.emitFormValidity();
      }
    });
  }

// Méthode pour valider l'email lors du blur
validateEmail(emailInput: NgModel) {
  emailInput.control.markAsTouched();
  this.emitFormValidity();
}

// Méthode pour valider le mot de passe lors du blur
validatePassword(passwordInput: NgModel) {
  passwordInput.control.markAsTouched();
  this.emitFormValidity();
}


emitFormValidity() {
  const isValid = this.isFormValid();  // Calcul de la validité du formulaire
  this.validityChange.emit(isValid);  // Émission de l'événement

}

}


