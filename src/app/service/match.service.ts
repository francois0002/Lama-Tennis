import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private apiUrl = `${environment.apiUrl}/matchs`;

  constructor(private http: HttpClient) {}

  saveMatchScore(matchData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/save-match`, matchData);
  }

}
