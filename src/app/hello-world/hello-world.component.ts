import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class HelloWorldComponent implements OnInit {
  message: string | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<{ message: string }>('http://localhost:3000/message')
      .subscribe(response => {
        this.message = response.message;
      });
  }
}
