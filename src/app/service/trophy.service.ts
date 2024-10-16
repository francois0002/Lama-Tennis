import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class TrophyService {
  private apiUrl = 'http://localhost:3000/trophies'; // URL de l'API pour les trophées

  constructor(private http: HttpClient, private notificationService: NotificationService) {}

  // Vérifier si l'utilisateur a gagné un trophée
  checkTrophy(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/check/${userId}`).pipe(
      tap((response: any) => {
        console.log('Vérification des trophées:', response);
        if (response.trophies && response.trophies.length > 0) {
          // Si des trophées sont gagnés, envoyer une notification
          const trophiesWon = response.trophies.map((trophy: any) => trophy.name).join(', ');
          this.notificationService.sendNotification(`Félicitations ! Vous avez gagné les trophées suivants : ${trophiesWon}`);
        }
      })
    );
  }

  // Récupérer tous les trophées
  getAllTrophies(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
