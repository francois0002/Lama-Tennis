import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormService } from '../../../service/form.service';
import { FormsModule, NgModel } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inscription-step2',
  standalone: true,
  imports: [FormsModule, CommonModule, MatFormField],
  templateUrl: './step2-credential.component.html',
  styleUrl: './step2-credential.component.css',
})
export class InscriptionStep2Component implements OnInit {
  @Output() validityChange = new EventEmitter<boolean>(); // Output event to notify parent

  firstName: string = '';
  lastName: string = '';
  phoneNumber: string = '';

  private service = inject(FormService);

  ngOnInit() {
    const formData = this.service.getFormData();
    this.firstName = formData.firstName || '';
    this.lastName = formData.lastName || '';
    this.phoneNumber = formData.phoneNumber || '';
    this.emitFormValidity();
  }

  emitFormValidity() {
    const isValid =
      this.firstName.trim() !== '' &&
      this.lastName.trim() !== '' &&
      /^(06|07)\d{8}$/.test(this.phoneNumber);
    this.validityChange.emit(isValid);
  }

  // Method call when there is a change in the first name
  updateFirstName(newFirstName: string) {
    this.firstName = newFirstName;
    this.service.updateForm({ firstName: this.firstName });
    this.emitFormValidity();
  }

  // Method call when there is a change in the last name
  updateLastName(newLastName: string) {
    this.lastName = newLastName;
    this.service.updateForm({ lastName: this.lastName });
    this.emitFormValidity();
  }

  // Method call when there is a change in the phone number
  updatePhoneNumber(newPhoneNumber: string) {
    this.phoneNumber = newPhoneNumber;
    this.service.updateForm({ phoneNumber: this.phoneNumber });
    this.emitFormValidity();
  }

  // Method to validate the phone number
  validatePhoneNumber(phoneInput: NgModel) {
    phoneInput.control.markAsTouched();
    const phonePattern = /^(06|07)\d{8}$/;
    if (!phonePattern.test(this.phoneNumber)) {
      console.log('Le numéro de téléphone est invalide.');
    }
  }
}
