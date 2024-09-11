import { Component, inject, OnInit } from '@angular/core';
import { BackButtonComponent } from '../../button/back-button/back-button.component';
import { EmailButtonComponent } from '../../button/email-button/email-button.component';
import { PasswordButtonComponent } from '../../button/password-button/password-button.component';
import { FormService } from '../../service/form.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inscription-step1',
  standalone: true,
  imports: [
    BackButtonComponent,
    EmailButtonComponent,
    PasswordButtonComponent,
    FormsModule
  ],
  templateUrl: './step1-credential.component.html',
  styleUrls: ['./step1-credential.component.css']
})
export class InscriptionStep1Component implements OnInit {
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


}
