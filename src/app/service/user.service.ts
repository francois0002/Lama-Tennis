import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  updateUserClub(userId: string, clubId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/users/${userId}`, { club: clubId });
  }
}
