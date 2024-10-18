import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Pour ngModel
import { CommonModule } from '@angular/common'; // Pour ngFor
import { ClubService } from '../service/api-service/api-services';
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
  clubs: any[] = []; // Définir le type d'array en fonction de votre structure de données

  constructor(
    private clubService: ClubService,
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  // Fonction pour effectuer la recherche avec les filtres
  searchClubs() {
    this.errorMessage = ''; // Réinitialiser le message d'erreur à chaque recherche

    if (!this.town && !this.name_club) {
      this.errorMessage =
        'Veuillez remplir au moins un filtre pour effectuer une recherche.';
      return; // Empêche la recherche si les filtres sont vides
    }

    this.clubService
      .getClubs(this.town, this.department, this.region, this.name_club)
      .subscribe({
        next: (data: any[]) => {
          console.log('Data:', data);
          this.clubs = data;

          // Vérifier si aucun club n'a été trouvé
          if (this.clubs.length === 0) {
            this.errorMessage = 'Aucun club trouvé pour ces critères.';
          }
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des clubs:', err);
        },
      });
  }

  // Fonction pour sélectionner un club

  selectClub(clubId: string) {
    const userId = this.authService.getUser().id; // ID de l'utilisateur actuel

    // Mettre à jour l'utilisateur avec le club sélectionné
    this.userService.updateUserClub(userId, clubId).subscribe({
      next: () => {
        console.log("Club mis à jour avec succès pour l'utilisateur");

        // Ajouter l'utilisateur au club

        console.log(clubId);
        this.clubService.addUserToClub(clubId, userId).subscribe({
          next: () => {
            console.log('Utilisateur ajouté avec succès au club');
            // Redirige vers la page d'accueil
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
