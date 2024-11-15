import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  updateUserClub(userId: string, clubId: string | null): Observable<any> {
    return this.http.patch(`${this.apiUrl}/update-club/${userId}`, {
      club: clubId,
    });
  }

  getUserInfo(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  updateUserPersonalInfo(userId: string, updatedData: any): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/${userId}/updatePersonalInfo`,
      updatedData
    );
  }

  updateTennisInfo(userId: string, updatedTennis: any): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/${userId}/updateTennisInfo`,
      updatedTennis
    );
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }
}
