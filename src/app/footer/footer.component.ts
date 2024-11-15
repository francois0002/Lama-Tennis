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
  imports: [MatIconModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  // Open the dialog to join a club
  openJoinClubDialog() {
    this.dialog.open(JoinClubDialogComponent, {
      width: '300px',
      data: { message: 'Vous devez rejoindre un club pour accéder à cette section.' },
    });
  }

  // Method to navigate to a page home my club, home partners or home result
  navigateToPage(page: string) {
    const userId = this.authService.getCurrentUserId(); 

    if (userId) {
      // get user info
      this.userService.getUserInfo(userId).subscribe(user => {
        if (!user.club && (page === '/home/my-club' || page === '/home/partners'|| page === '/home/result')) {
          this.openJoinClubDialog();
        } else {
          this.router.navigate([page]);
        }
      });
    } else {
      console.error('User ID is null');
    }
  }
}
