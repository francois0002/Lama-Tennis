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
  @Output() emailAvailabilityChange = new EventEmitter<boolean>(); // Émission de l'événement pour la disponibilité de l'email
  @Output() validityChange = new EventEmitter<boolean>();
  emailError: string = '';

  constructor(private service: FormService, private emailService: EmailService) {}

  ngOnInit() {
    const formData = this.service.getFormData();
    this.email = formData.email;
    this.password = formData.password;
  }

  updateEmail(newEmail: string) {
    this.email = newEmail;
    this.service.updateForm({ email: this.email });
  }

  updatePassword(newPassword: string) {
    this.password = newPassword;
    this.service.updateForm({ password: this.password });
  }

  isFormValid(): boolean {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    return emailPattern.test(this.email) && passwordPattern.test(this.password);
  }

  onEmailBlur(emailInput: NgModel) {
    this.validateEmail(emailInput);
    if (emailInput.valid && this.email) {
      this.checkEmailAvailability(this.email);  // Ajout de la vérification de la disponibilité de l'email après le blur
    }
  }

  checkEmailAvailability(email: string) {
    this.emailService.checkEmail(email).subscribe({
      next: (response) => {
        this.emailError = '';
        this.emailAvailabilityChange.emit(true); // Notifier le parent que l'email est disponible
        this.emitFormValidity();
      },
      error: (err) => {
        if (err.status === 400) {
          this.emailError = err.error.message;
          this.emailAvailabilityChange.emit(false); // Notifier le parent que l'email n'est pas disponible
        } else {
          console.error("Erreur lors de la vérification de l'email:", err);
        }
        this.emitFormValidity();
      }
    });
  }

  validateEmail(emailInput: NgModel) {
    emailInput.control.markAsTouched();
    this.emitFormValidity();
  }

  validatePassword(passwordInput: NgModel) {
    passwordInput.control.markAsTouched();
    this.emitFormValidity();
  }

  emitFormValidity() {
    const isValid = this.isFormValid();
    this.validityChange.emit(isValid);
  }

}
