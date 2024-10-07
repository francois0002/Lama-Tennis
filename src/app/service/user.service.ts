import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  updateUserClub(userId: string, clubId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/users/${userId}`, { club: clubId });
  }

   // Fonction pour obtenir les informations de l'utilisateur
   getUserInfo(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}`);
  }

  getClubInfo(clubId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/clubs/${clubId}`);
  }

  // fontion pour supprimer un utilisateur du club
  removeUserFromClub(clubId: string, userId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/clubs/${clubId}/removeUser`, { userId });
  }

  // Nouvelle fonction pour mettre à jour les informations utilisateur
  updateUserInfo(userId: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}`, updatedData);
  }
}
