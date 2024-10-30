import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TrophyService {

  private apiUrl = `${environment.apiUrl}/trophies`;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  // Vérifier si l'utilisateur a gagné un trophée
  checkTrophy(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/check/${userId}`).pipe(
      tap((response: any) => {
        console.log('Vérification des trophées:', response);

        if (response && response.trophies && response.trophies.length > 0) {
          // Construire un message pour chaque trophée gagné avec nom et description
          const trophiesWon = response.trophies
            .map((trophy: any) => `${trophy.name}`)
            .join('\n'); // Ajoute un saut de ligne pour chaque trophée

          // Envoyer une notification avec la liste des trophées gagnés
          this.notificationService.sendNotification(
            `🏆 Haut-fait obtenu : \n${trophiesWon}`
          );
        } else {
          console.log("Aucun trophée gagné ou réponse invalide.");
        }
      })
    );
  }

  // Récupérer tous les trophées
  getAllTrophies(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
