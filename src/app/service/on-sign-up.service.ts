import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {


  private apiUrl = `${environment.apiUrl}/auth/inscription`;

  constructor(private http: HttpClient) {}


  saveToDatabase(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);  
  }
}
