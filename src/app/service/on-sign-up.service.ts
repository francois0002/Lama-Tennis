import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Pour envoyer des données au serveur (MongoDB)
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {

  private apiUrl = 'http://localhost:3000/api/inscription';

  constructor(private http: HttpClient) {}

  // Sauvegarde des données sur un serveur qui se connecte à MongoDB
  saveToDatabase(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);  // Utilisation d'HttpClient pour envoyer des données
  }
}
