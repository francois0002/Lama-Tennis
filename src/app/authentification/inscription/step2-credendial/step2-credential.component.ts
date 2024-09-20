import { Component,EventEmitter,inject, OnInit, Output } from '@angular/core';
import { FormService } from '../../../service/form.service';
import { FormsModule, NgModel } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inscription-step2',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatFormField
  ],
  templateUrl: './step2-credential.component.html',
  styleUrl: './step2-credential.component.css'
})
export class InscriptionStep2Component implements OnInit {  // Implémente OnInit pour l'initialisation

  @Output() validityChange = new EventEmitter<boolean>();  // Output event to notify parent


  // Propriétés pour les champs d'entrée
  firstName: string = '';  // Champ pour le prénom
  lastName: string = '';   // Champ pour le nom
  phoneNumber: string = '';  // Champ pour le numéro de téléphone

  private service = inject(FormService);  // Injection du service FormService

  ngOnInit() {
    // Récupérer les données du formulaire depuis le service et initialiser les propriétés
    const formData = this.service.getFormData();
    this.firstName = formData.firstName || '';  // Initialise le prénom avec les données du service
    this.lastName = formData.lastName || '';    // Initialise le nom avec les données du service
    this.phoneNumber = formData.phoneNumber || '';  // Initialise le numéro de téléphone avec les données du service
    this.emitFormValidity();  // Émettre la validité du formulaire
  }


  // Émettre la validité du formulaire
  emitFormValidity() {
    const isValid = this.firstName.trim() !== '' && this.lastName.trim() !== '' &&
      /^(06|07)\d{8}$/.test(this.phoneNumber); // Ajout d'une vérification de la validité des champs
    this.validityChange.emit(isValid); // Informe le parent si le formulaire est valide ou non
  }

  // Méthode appelée lorsqu'il y a un changement dans le prénom
  updateFirstName(newFirstName: string) {
    this.firstName = newFirstName;
    this.service.updateForm({ firstName: this.firstName });
    this.emitFormValidity();
  }

  // Méthode appelée lorsqu'il y a un changement dans le nom
  updateLastName(newLastName: string) {
    this.lastName = newLastName;
    this.service.updateForm({ lastName: this.lastName });
    this.emitFormValidity();
  }

  // Méthode appelée lorsqu'il y a un changement dans le numéro de téléphone
  updatePhoneNumber(newPhoneNumber: string) {
    this.phoneNumber = newPhoneNumber;
    this.service.updateForm({ phoneNumber: this.phoneNumber });
    this.emitFormValidity();
  }

  // Méthode pour valider le numéro de téléphone (doit commencer par 06 ou 07 et avoir 10 chiffres)
  validatePhoneNumber(phoneInput: NgModel) {
    phoneInput.control.markAsTouched();
    const phonePattern = /^(06|07)\d{8}$/;  // Vérifie si le numéro commence par 06 ou 07 et a 10 chiffres
    if (!phonePattern.test(this.phoneNumber)) {
      console.log("Le numéro de téléphone est invalide.");
    }
  }
}

