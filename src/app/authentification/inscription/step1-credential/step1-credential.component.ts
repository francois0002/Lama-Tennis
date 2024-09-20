import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { EmailButtonComponent } from '../../button/email-button/email-button.component';
import { PasswordButtonComponent } from '../../button/password-button/password-button.component';
import { FormService } from '../../../service/form.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inscription-step1',
  standalone: true,
  imports: [
    EmailButtonComponent,
    PasswordButtonComponent,
    FormsModule,
    CommonModule
  ],
  templateUrl: './step1-credential.component.html',
  styleUrls: ['./step1-credential.component.css']
})
export class InscriptionStep1Component implements OnInit {

  @Output() validityChange = new EventEmitter<boolean>();  // Output event to notify parent

  private service = inject(FormService);

  ngOnInit() {
    // Récupérer les données du formulaire depuis le service et initialiser les propriétés
    const formData = this.service.getFormData();
    this.email = formData.email;
    this.password = formData.password;
  }

  // Propriétés pour les champs d'entrée
  email: string = '';
  password: string = '';

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
// Méthode pour valider l'email lors du blur
validateEmail(emailInput: NgModel) {
  emailInput.control.markAsTouched();
  if (emailInput.invalid) {
    console.log("L'email est invalide ou manquant.");
  } else {
    console.log("L'email est valide.");
  }
  this.emitFormValidity();
}

// Méthode pour valider le mot de passe lors du blur
validatePassword(passwordInput: NgModel) {
  passwordInput.control.markAsTouched();
  if (passwordInput.invalid) {
    console.log("Le mot de passe est invalide ou manquant.");
  } else {
    console.log("Le mot de passe est valide.");
  }
  this.emitFormValidity();
}


emitFormValidity() {
  this.validityChange.emit(this.isFormValid());
}

}


