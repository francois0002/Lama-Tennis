import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { JoinClubDialogComponent } from './join-club-pop-up/join-club-pop-up.component';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatIconModule, JoinClubDialogComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(
    private router: Router,
    private userService: UserService, // Injectez le service utilisateur
    private dialog: MatDialog, // Injectez MatDialog pour la pop-up
    private authService: AuthService // Injectez le service d'authentification
  ) {}

  // Méthode pour ouvrir la pop-up si l'utilisateur n'a pas de club
  openJoinClubDialog() {
    this.dialog.open(JoinClubDialogComponent, {
      width: '300px',
      data: { message: 'Vous devez rejoindre un club pour accéder à cette section.' },
    });
  }

  // Méthode pour naviguer, avec vérification du club pour "Mon club" et "Partenaires"
  navigateToPage(page: string) {
    const userId = this.authService.getCurrentUserId(); // Remplacez par l'ID de l'utilisateur

    if (userId) {
      // Obtenez les informations de l'utilisateur
      this.userService.getUserInfo(userId).subscribe(user => {
        if (!user.club && (page === '/home/my-club' || page === '/home/partners'|| page === '/home/result')) {
          // Si l'utilisateur n'a pas de club, ouvrez la pop-up
          this.openJoinClubDialog();
        } else {
          // Sinon, naviguez normalement
          this.router.navigate([page]);
        }
      });
    } else {
      // Handle the case when userId is null
      console.error('User ID is null');
    }
  }
}
