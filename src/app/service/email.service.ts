import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'http://localhost:3000/api/check-email';

  constructor(private http: HttpClient) {}

  // Méthode pour vérifier si l'email existe
  checkEmail(email: string): Observable<any> {
    return this.http.post('http://localhost:3000/api/check-email',
      { email },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
