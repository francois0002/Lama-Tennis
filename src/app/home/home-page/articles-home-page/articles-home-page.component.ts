import { Component, OnInit } from '@angular/core';
import { StandartButtonComponent } from '../../../form&button/standart-button/standart-button.component';
import { UserService } from '../../../service/user.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { ClubService } from '../../../service/clubs-services';

@Component({
  selector: 'app-articles-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './articles-home-page.component.html',
  styleUrl: './articles-home-page.component.css',
})
export class ArticlesHomePageComponent implements OnInit {
  user: any = {};
  club: any;

  constructor(
    private userService: UserService,
    private clubsService: ClubService,
    private authservice: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authservice.getCurrentUserId();

    if (userId) {
      // fetch user info
      this.userService.getUserInfo(userId).subscribe((data) => {
        this.user = data;

        if (this.user.club) {
          this.fetchClubInfo(this.user.club);
        }
      });
    } else {
      console.error('User ID is null');
    }
  }

  // fecth club info
  fetchClubInfo(clubId: string): void {
    this.clubsService.getClubInfo(clubId).subscribe((data) => {
      this.club = data;
    });
  }

  capitalizeWords(text: string): string {
    if (!text) return '';

    return text
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  navigateToPage(page: string) {
    this.router.navigate([page]);
  }
}
