import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    RouterModule,
    MatBadgeModule,
  ],
  templateUrl: `./nav-bar.component.html`,
  styleUrls: ['./nav-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent implements OnInit {
  isHidden = false;
  lastScrollTop = 0;
  notificationCount: number = 0; // Compteur des notifications
  showNotifications: boolean = false; // Contrôle l'affichage des notifications
  notifications: string[] = []; // Stocke les notifications

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > this.lastScrollTop) {
      // Scroll vers le bas
      this.isHidden = true;
    } else {
      // Scroll vers le haut
      this.isHidden = false;
    }
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  ngOnInit() {
    // S'abonner aux notifications de trophées
    this.notificationService.sendNotification$.subscribe((message) => {
      console.log('Notification reçue :', message); // Log pour vérifier si la notification est bien reçue
      this.notifications.push(message);
      this.notificationCount++; // Incrémenter le nombre de notifications
    });
  }

  // Marquer les notifications comme lues
  markNotificationsAsRead(): void {
    this.notificationCount = 0; // Réinitialiser le compteur
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications; // Afficher ou cacher les notifications
  }

  removeNotification(notification: string): void {
    this.notifications = this.notifications.filter((n) => n !== notification); // Supprimer la notification
    this.notificationCount--; // Décrementer le compteur
  }

  logout(): void {
    this.authService.logout(); // Appel de la méthode logout
    this.router.navigate(['/home-login']); // Redirection après la déconnexion
  }
}
