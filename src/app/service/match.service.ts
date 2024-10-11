import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private apiUrl = 'http://localhost:3000/matchs'; // URL de l'API

  constructor(private http: HttpClient) {}

  saveMatchScore(matchData: any): Observable<any> {
    return this.http.post(this.apiUrl, matchData);
  }

  // Méthode pour récupérer les statistiques d'un joueur
  getUserStatistics(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }

    // Méthode pour récupérer l'historique des matchs d'un utilisateur
    getUserMatchHistory(userId: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/user/${userId}/history`);
    }

}
