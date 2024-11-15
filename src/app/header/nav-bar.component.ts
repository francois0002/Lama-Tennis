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
  notificationCount: number = 0;
  showNotifications: boolean = false;
  notifications: string[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > this.lastScrollTop) {
      // Scroll down
      this.isHidden = true;
    } else {
      // Scroll up
      this.isHidden = false;
    }
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  ngOnInit() {
    // subscribe to the notification service
    this.notificationService.sendNotification$.subscribe((message) => {
      this.notifications.push(message);
      this.notificationCount++;
    });
  }

  // Mmark all notifications as read
  markNotificationsAsRead(): void {
    this.notificationCount = 0; // Reinitialysed the counter
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications; // display the notifications
  }

  removeNotification(notification: string): void {
    this.notifications = this.notifications.filter((n) => n !== notification); // delete the notification
    this.notificationCount--; // decrement the counter
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home-login']);
  }
}
