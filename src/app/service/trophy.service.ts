import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrophyService {
  private apiUrl = 'http://localhost:3000/trophies'; // URL de l'API pour les trophées

  constructor(private http: HttpClient) {}

  // Vérifier si l'utilisateur a gagné un trophée
  checkTrophy(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/check/${userId}`);
  }

  // Récupérer tous les trophées
  getAllTrophies(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
