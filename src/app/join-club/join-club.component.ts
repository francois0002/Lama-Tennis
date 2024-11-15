import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Pour ngModel
import { CommonModule } from '@angular/common'; // Pour ngFor
import { ClubService } from '../service/clubs-services';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-join-club',
  templateUrl: './join-club.component.html',
  styleUrls: ['./join-club.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class JoinClubComponent {
  town: string = '';
  department: string = '';
  region: string = '';
  name_club: string = '';
  errorMessage: string = '';
  clubs: any[] = [];

  constructor(
    private clubService: ClubService,
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  // function to search clubs
  searchClubs() {
    this.errorMessage = '';

    if (!this.town && !this.name_club) {
      this.errorMessage =
        'Veuillez remplir au moins un filtre pour effectuer une recherche.';
      return;
    }

    this.clubService
      .getClubs(this.town, this.department, this.region, this.name_club)
      .subscribe({
        next: (data: any[]) => {
          console.log('Data:', data);
          this.clubs = data;

          // check if there are clubs
          if (this.clubs.length === 0) {
            this.errorMessage = 'Aucun club trouvé pour ces critères.';
          }
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des clubs:', err);
        },
      });
  }

  // function to select a club

  selectClub(clubId: string) {
    const userId = this.authService.getUser().id;

    // update user club
    this.userService.updateUserClub(userId, clubId).subscribe({
      next: () => {
        console.log("Club mis à jour avec succès pour l'utilisateur");

        // Add user to club

        console.log(clubId);
        this.clubService.addUserToClub(clubId, userId).subscribe({
          next: () => {
            console.log('Utilisateur ajouté avec succès au club');
            // Redirect to home page
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.error(
              "Erreur lors de l'ajout de l'utilisateur au club:",
              err
            );
          },
        });
      },
      error: (err) => {
        console.error(
          "Erreur lors de la mise à jour du club de l'utilisateur:",
          err
        );
      },
    });
  }
}
