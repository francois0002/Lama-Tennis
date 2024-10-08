import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { ClubService } from '../service/api-service/api-services';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
})
export class MyAccountComponent implements OnInit {
  user: any;
  clubName: string = '';
  isEditingPersonalInfo: boolean = false;
  isEditingTennisInfo: boolean = false;

  // Form Groups for the user and tennis info
  userForm: FormGroup;
  tennisForm: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private clubService: ClubService,
    private fb: FormBuilder
  ) {
    // Initialize forms
    this.userForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phoneNumber: ['']
    });

    this.tennisForm = this.fb.group({
      club: [''],
      level: [''],
      ranking: ['']
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
            phoneNumber: data.phoneNumber
          });
          this.tennisForm.patchValue({
            level: data.level,
            ranking: data.ranking
          });

          if (this.user.club) {
            this.loadClubInfo(this.user.club);
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération des informations de l’utilisateur :', error);
        }
      );
    }
  }

  loadClubInfo(clubId: string): void {
    this.clubService.getClubById(clubId).subscribe(
      (clubData) => {
        if (clubData) {
          this.clubName = clubData.name_club;
          this.tennisForm.patchValue({ club: clubData.name_club });
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des informations du club :', error);
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
        club: this.user.club // Ajoutez le club existant
      };
      this.userService.updateUserPersonalInfo(this.user._id, updatedData).subscribe(() => {
        this.isEditingPersonalInfo = false;
        alert('Informations personnelles mises à jour.');
      });
    }
  }


  // Update tennis information
  updateTennisInfo(): void {
    if (this.tennisForm.valid) {
      const updatedTennis = this.tennisForm.value;
      this.userService.updateUserClub(this.user._id, updatedTennis.club).subscribe(() => {
        this.isEditingTennisInfo = false;
        alert('Informations tennis mises à jour.');
      });
    }
  }
}
