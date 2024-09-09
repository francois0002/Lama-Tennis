import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HelloService } from './hello.service';

@Component({
  selector: 'app-hello-world',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Assurer l'importation des modules nécessaires
  providers: [HelloService], // Fournir le service ici
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent implements OnInit {
  message: string = '';

  constructor(private helloService: HelloService) { }

  ngOnInit() {
    this.helloService.getHello().subscribe(data => {
      this.message = data;
    });
  }
}
