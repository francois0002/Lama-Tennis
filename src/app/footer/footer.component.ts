import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  user: any; // Pour stocker les données de l'utilisateur

  constructor(
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    // Récupérer les informations de l'utilisateur
    this.userService.getUserInfo(userId).subscribe(user => {
      this.user = user;

      // Vérifier si l'utilisateur n'a pas de club
      if (!this.user.club) {
        this.openJoinClubDialog(); // Ouvrir la pop-up si le club est vide
      }
    });
  }

  navigateToPage(page: string) {
    this.router.navigate([page]);
  }

  openJoinClubDialog(): void {
    const dialogRef = this.dialog.open(JoinClubDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Pop-up fermée');
    });
  }
}
