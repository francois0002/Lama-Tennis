// club.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Club } from '../interface/club.interface';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  private apiUrl = 'http://localhost:3000/clubs';

  constructor(private http: HttpClient) {}

  getClubs(town?: string, department?: string, region?: string, name_club?: string) {
    let params: any = {};
    if (town) params.town = town;
    if (department) params.department = department;
    if (region) params.region = region;
    if (name_club) params.name_club = name_club;

    return this.http.get<Club[]>(this.apiUrl, { params });
  }
}
