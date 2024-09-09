import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export class HelloService {
  private apiUrl = 'http://localhost:3000'; // URL de l'API Node.js

  constructor(@Inject('url') private http: HttpClient) { }

  getHello(): Observable<string> {
    return this.http.get<string>(this.apiUrl, { responseType: 'text' as 'json' }); // Assure-toi que le type de réponse est correct
  }
}
