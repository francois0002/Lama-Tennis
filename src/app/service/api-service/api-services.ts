// club.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Club } from '../../interface/club.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClubService {
  private apiUrl = 'http://localhost:3000/clubs';
  private clubSubject = new BehaviorSubject<any>(null);
  public club$ = this.clubSubject.asObservable();

  constructor(private http: HttpClient) {}

  getClubById(clubId: string): Observable<Club> {
    return this.http.get<Club>(`${this.apiUrl}/${clubId}`);
  }

  getClubs(
    town?: string,
    department?: string,
    region?: string,
    name_club?: string
  ) {
    let params: any = {};
    if (town) params.town = town;
    if (department) params.department = department;
    if (region) params.region = region;
    if (name_club) params.name_club = name_club;

    return this.http.get<Club[]>(this.apiUrl, { params });
  }

  // Correction de la méthode pour ajouter un utilisateur au club
  addUserToClub(clubId: string, userId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${clubId}/addUser`, { userId });
  }



}
