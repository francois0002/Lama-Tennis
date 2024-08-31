import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClubService {
  private apiUrl = 'http://localhost:3000/clubs';

  constructor(private http: HttpClient) {}

  getClubs(filters: { town?: string; region?: string; department?: string }): Observable<any[]> {
    let params = new HttpParams();
    if (filters.town) params = params.set('town', filters.town);
    if (filters.region) params = params.set('region', filters.region);
    if (filters.department) params = params.set('department', filters.department);

    return this.http.get<any[]>(this.apiUrl, { params });
  }
}
