import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = `${environment.apiUrl}/email`;

  constructor(private http: HttpClient) {}

  sendEmailAll(to: string[], subject: string, text: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-email`, { to: to.join(','), subject, text }); // Join array into a single string
  }

  // Envoi d'un email à l'administrateur
  sendEmailAdmin(
    userEmail: string,
    message: string,
    subject: string
  ): Observable<any> {
    console.log('email:', userEmail, 'message:', message, 'subject:', subject);
    const body = {
      userEmail: userEmail,
      message: message,
      subject: subject,
    };

    return this.http.post(`${this.apiUrl}/send-email-to-admin`, body, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
