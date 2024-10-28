import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private apiUrl = 'http://localhost:3000/matchs';

  constructor(private http: HttpClient) {}

  saveMatchScore(matchData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/save-match`, matchData);
  }

}
