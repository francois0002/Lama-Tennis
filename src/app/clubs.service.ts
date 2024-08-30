import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClubsService {
  private dataUrl = 'assets/clubs.json'; // chemin vers votre fichier JSON

  constructor(private http: HttpClient) { }

  getClubs(): Observable<any[]> {
    return this.http.get<any[]>(this.dataUrl);
  }
}
