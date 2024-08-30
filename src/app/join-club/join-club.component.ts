import { Component, OnInit } from '@angular/core';
import { ClubsService } from '../clubs.service';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-clubs',
  standalone: true,
  imports: [
    RouterOutlet, FormsModule, HttpClientModule, BrowserModule, CommonModule
  ],
  templateUrl: './join-club.component.html',
  styleUrls: ['./join-club.component.css']

})
export class JoinClubComponent implements OnInit {
  clubs: any[] = [];
  filteredClubs: any[] = [];
  cities: string[] = [];
  regions: string[] = [];
  departments: string[] = [];
  selectedCity: string = '';
  selectedRegion: string = '';
  selectedDepartment: string = '';

  constructor(private clubsService: ClubsService) {}

  ngOnInit(): void {
    this.clubsService.getClubs().subscribe(data => {
      this.clubs = data;
      this.filteredClubs = this.clubs;
      this.populateFilters();
    });
  }

  populateFilters(): void {
    this.cities = Array.from(new Set(this.clubs.map(club => club.ville)));
    this.regions = Array.from(new Set(this.clubs.map(club => club.région)));
    this.departments = Array.from(new Set(this.clubs.map(club => club.département)));
  }

  filterClubs(): void {
    this.filteredClubs = this.clubs.filter(club =>
      (this.selectedCity === '' || club.ville === this.selectedCity) &&
      (this.selectedRegion === '' || club.région === this.selectedRegion) &&
      (this.selectedDepartment === '' || club.département === this.selectedDepartment)
    );
  }
}
