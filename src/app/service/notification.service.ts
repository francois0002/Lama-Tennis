import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<string>();
  sendNotification$ = this.notificationSubject.asObservable(); 

  constructor() {}


  sendNotification(message: string): void {
    console.log('Envoi de la notification :', message); 
    this.notificationSubject.next(message); 
  }
}
