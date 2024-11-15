import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  // function to login
  login(email: string, password: string): Observable<any> {
    console.log(
      'Email et mot de passe envoyés pour connexion :',
      email,
      password
    ); // Vérifiez ici les données
    return this.http.post(`${this.apiUrl}/connexion`, { email, password });
  }

  // function to check if email exists
  checkEmail(email: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/connexion/check-email`,
      { email },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // Stock toker afeter login
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // function to fetch user connected
  getUser() {
    const token = this.getToken();
    if (!token) {
      console.log('Token non trouvé');
      return null;
    }
    const user = this.decodeToken(token);
    console.log('Utilisateur décodé :', user);
    return user;
  }

  getUserEmail(): string | null {
    const user = this.getUser();
    if (user && user.email) {
      return user.email;
    } else if (user && user.username) {
      return user.username;
    } else {
      console.log('Email non trouvé dans le token');
      return null;
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  decodeToken(token: string): any {
    const payload = token.split('.')[1];
    const decoded = window.atob(payload);
    return JSON.parse(decoded);
  }

  getCurrentUserId(): string | null {
    const user = this.getUser();
    return user ? user.id : null;
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, {
      token,
      newPassword,
    });
  }

  validatePassword(userId: string, password: string): Observable<boolean> {
    const data = { userId, password };
    console.log('Données envoyées pour validation du mot de passe :', data);
    return this.http.post<boolean>(`${this.apiUrl}/validate-password`, data);
  }
}
