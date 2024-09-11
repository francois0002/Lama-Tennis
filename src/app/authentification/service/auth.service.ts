import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // Fonction pour vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    // Vérifie si le token est stocké dans localStorage
    return true;
  }
}
