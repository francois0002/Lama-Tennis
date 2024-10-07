import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service'; // Chemin vers ton service AuthService
import { UserService } from '../service/user.service'; // Chemin vers ton service UserService
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-my-account',
  standalone: true,
  imports : [CommonModule],
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  user: any;
  clubName: string = '';

  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    const user = this.authService.getUser();
    if (user && user.id) {
      this.userService.getUserInfo(user.id).subscribe(
        (data) => {
          this.user = data;
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
    this.userService.getClubInfo(clubId).subscribe(
      (clubData) => {
        this.clubName = clubData.name;
      },
      (error) => {
        console.error('Erreur lors de la récupération des informations du club :', error);
      }
    );
  }
}
