import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { ClubService } from '../service/clubs-services';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

interface Level {
  value: string;
  viewValue: string;
}

interface Ranking {
  value: string;
  viewValue: string;
}

interface Club {
  _id: string; // Assurez-vous que l'ID est de type string
  name_club: string;
  // Ajoutez d'autres propriétés pertinentes pour votre application
}

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule
  ],
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
})
export class MyAccountComponent implements OnInit {
  user: any;
  clubName: string = '';
  clubId: string = ''; // Stocker l'ID du club ici
  isEditingPersonalInfo: boolean = false;
  isEditingTennisInfo: boolean = false;

  // Form Groups for the user and tennis info
  userForm: FormGroup;
  tennisForm: FormGroup;

  // Levels and rankings data
  levels: Level[] = [
    { value: 'Débutant', viewValue: 'Débutant' },
    { value: 'Intermédiaire', viewValue: 'Intermédiaire' },
    { value: 'Confirmé', viewValue: 'Confirmé' },
  ];

  rankingGroups: any[] = [
    {
      name: '4e série',
      ranking: [
        { value: '40', viewValue: '40' },
        { value: '30/5', viewValue: '30/5' },
        { value: '30/4', viewValue: '30/4' },
        { value: '30/3', viewValue: '30/3' },
        { value: '30/2', viewValue: '30/2' },
        { value: '30/1', viewValue: '30/1' },
      ],
    },
    {
      name: '2e série',
      ranking: [
        { value: '15', viewValue: '15' },
        { value: '5/6', viewValue: '5/6' },
        { value: '4/6', viewValue: '14/6' },
        { value: '3/6', viewValue: '3/6' },
        { value: '2/6', viewValue: '2/6' },
        { value: '1/6', viewValue: '1/6' },
        { value: '0', viewValue: '0' },
        { value: '-2/6', viewValue: '-2/6' },
        { value: '-4/6', viewValue: '-4/6' },
        { value: '-15', viewValue: '-15' },
      ],
    },
    {
      name: '1re série',
      ranking: [{ value: '1re série', viewValue: '1re série' }],
    },
  ];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private clubService: ClubService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // Initialize forms
    this.userForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phoneNumber: [''],
    });

    this.tennisForm = this.fb.group({
      club: [''], // Vous pouvez garder cette ligne pour le cas où vous utilisez un sélecteur
      level: [''],
      ranking: [''],
    });



  }

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    const user = this.authService.getUser();
    if (user && user.id) {
      this.userService.getUserInfo(user.id).subscribe(
        (data) => {
          this.user = data;
          this.userForm.patchValue({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
          });
          this.tennisForm.patchValue({
            level: data.level,
            ranking: data.ranking,
          });

          if (this.user.club) {
            this.loadClubInfo(this.user.club);
          }
        },
        (error) => {
          console.error(
            'Erreur lors de la récupération des informations de l’utilisateur :',
            error
          );
        }
      );
    }
  }



  loadClubInfo(clubId: string): void {
    this.clubService.getClubInfo(clubId).subscribe(
      (clubData) => {
        if (clubData) {
          this.clubName = clubData.name_club;
          this.clubId = clubData._id; // Récupérer l'ID ici
          this.tennisForm.patchValue({ club: clubData._id }); // Optionnel, mais si vous voulez montrer l'ID du club
        }
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des informations du club :',
          error
        );
      }
    );
  }
  // Toggle editing mode
  toggleEditPersonalInfo(): void {
    this.isEditingPersonalInfo = !this.isEditingPersonalInfo;
  }

  toggleEditTennisInfo(): void {
    this.isEditingTennisInfo = !this.isEditingTennisInfo;
  }

  // Format phone number to display space after every two digits
  formatPhoneNumber(phoneNumber: string): string {
    return phoneNumber.replace(/(\d{2})(?=\d)/g, '$1 ');
  }

  // Update personal information
  updatePersonalInfo(): void {
    if (this.userForm.valid) {
      const updatedData = {
        ...this.userForm.value,
        club: this.user.club, // Ajoutez le club existant
      };
      this.userService
        .updateUserPersonalInfo(this.user._id, updatedData)
        .subscribe(() => {
          this.isEditingPersonalInfo = false;
          window.location.reload();
        });
    }
  }

  // Update tennis information
  updateTennisInfo(): void {
    if (this.tennisForm.valid) {
      const updatedTennis = {
        ...this.tennisForm.value,
        club: this.clubId, // Envoyer l'ID du club
      };
      console.log('Valeurs mises à jour:', updatedTennis); // Debugging

      this.userService
        .updateTennisInfo(this.user._id, updatedTennis) // Utilisation de la nouvelle méthode
        .subscribe(() => {
          this.isEditingTennisInfo = false;
          window.location.reload();
        }, (error) => {
          console.error('Erreur lors de la mise à jour des informations tennis:', error);
        });
    }
  }

  logout(): void {
    this.authService.logout(); // Ajoutez une méthode dans AuthService pour gérer la déconnexion
    this.router.navigate(['/home-login']); // Redirige vers la page de connexion
  }

  deleteUser(): void {
    const userId = this.user._id; // ID de l'utilisateur à supprimer
    this.userService.deleteUser(userId).subscribe(
      () => {

        this.logout(); // Déconnexion après suppression
      },
      (error) => {
        console.error("Erreur lors de la suppression du compte:", error);
        alert("Une erreur s'est produite lors de la suppression de votre compte.");
      }
    );
  }


}
