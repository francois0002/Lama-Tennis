import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<string>();
  sendNotification$ = this.notificationSubject.asObservable(); // Observable pour les abonnements

  constructor() {}

  // Méthode pour envoyer une notification
  sendNotification(message: string): void {
    console.log('Envoi de la notification :', message); // Log pour vérifier l'envoi
    this.notificationSubject.next(message); // Émettre la notification
  }
}
