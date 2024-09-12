import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // L'utilisateur est authentifié, autoriser l'accès
    } else {
      this.router.navigate(['/home/HomeLogin']); // Rediriger vers la page de connexion
      return false;
    }
  }
}
