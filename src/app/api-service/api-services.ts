// club.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  private apiUrl = 'http://localhost:3000/clubs';

  constructor(private http: HttpClient) {}

  getClubs(town?: string, department?: string, region?: string): Observable<any> {
    let params: any = {};
    if (town) params.town = town;
    if (department) params.department = department;
    if (region) params.region = region;

    return this.http.get<any[]>(this.apiUrl, { params });
  }
}
