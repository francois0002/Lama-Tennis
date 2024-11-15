import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { EmailButtonComponent } from '../../button/email-button/email-button.component';
import { PasswordButtonComponent } from '../../button/password-button/password-button.component';
import { FormService } from '../../../service/form.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from '../../user-login/user-login.component';
import { AuthService } from '../../../service/auth.service';

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
  styleUrls: ['./step1-credential.component.css'],
})
export class InscriptionStep1Component implements OnInit {
  @Input() email: string = '';
  @Input() password: string = '';
  @Output() emailAvailabilityChange = new EventEmitter<boolean>(); // Émission de l'événement pour la disponibilité de l'email
  @Output() validityChange = new EventEmitter<boolean>();
  emailError: string = '';

  constructor(
    private service: FormService,
    private checkEmailService: AuthService
  ) {}

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
  // Checks if the form is valid based on the email and password format
  isFormValid(): boolean {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    return emailPattern.test(this.email) && passwordPattern.test(this.password);
  }

  // Method to be called when the email input field loses focus
  onEmailBlur(emailInput: NgModel) {
    this.validateEmail(emailInput);
    if (emailInput.valid && this.email) {
      this.checkEmailAvailability(this.email);
    }
  }

  // Checks if the email is available by calling the service
  checkEmailAvailability(email: string) {
    this.checkEmailService.checkEmail(email).subscribe({
      next: (response) => {
        this.emailError = '';
        this.emailAvailabilityChange.emit(true);
        this.emitFormValidity();
      },
      error: (err) => {
        if (err.status === 400) {
          this.emailError = err.error.message;
          this.emailAvailabilityChange.emit(false);
        } else {
          console.error("Erreur lors de la vérification de l'email:", err);
        }
        this.emitFormValidity();
      },
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

  // Emits the form validity status based on the email and password validation
  emitFormValidity() {
    const isValid = this.isFormValid();
    this.validityChange.emit(isValid);
  }
}
