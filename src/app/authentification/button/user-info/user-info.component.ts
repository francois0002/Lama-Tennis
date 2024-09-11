import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-user-info-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,MatFormFieldModule, MatInput],
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoFormComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern(/^(0[1-9](?:[ .-]?\d{2}){4})$/) // Regex pour valider les numéros de téléphone internationaux
      ]]
    });
  }

  // Getters pour accéder facilement aux contrôles du formulaire
  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get phoneNumber() {
    return this.userForm.get('phoneNumber');
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Submitted', this.userForm.value);
    }
  }
}
