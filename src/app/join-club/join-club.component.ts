import { Component, OnInit } from '@angular/core';
import { ClubService } from '../api-service/api-services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-club-filter',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
  ],
  template: `
  <form (ngSubmit)="onSubmit()">
    <label for="town">Town:</label>
    <input id="town" [(ngModel)]="filters.town" name="town" />

    <label for="region">Région:</label>
    <input id="region" [(ngModel)]="filters.region" name="region" />

    <label for="department">Département:</label>
    <input id="department" [(ngModel)]="filters.department" name="department" />

    <button type="submit">Filtrer</button>
  </form>

  <ul>
    <li *ngFor="let club of clubs">{{ club.nom }} - {{ club.town }}</li>
  </ul>
`,
})
export class JoinClubComponent {
filters = { town: '', region: '', department: '' };
clubs: any[] = [];

constructor(private clubService: ClubService) {}

onSubmit() {
  this.clubService.getClubs(this.filters).subscribe((clubs) => {
    this.clubs = clubs;
  });
}
}
