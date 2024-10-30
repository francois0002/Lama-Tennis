import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Pour envoyer des données au serveur (MongoDB)
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {


  private apiUrl = `${environment.apiUrl}/auth/inscription`;

  constructor(private http: HttpClient) {}

  // Sauvegarde des données sur un serveur qui se connecte à MongoDB
  saveToDatabase(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);  // Utilisation d'HttpClient pour envoyer des données
  }
}
