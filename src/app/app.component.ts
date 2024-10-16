import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lama-tennis';

  // routes list where the footer should not be displayed

  hideFooter: boolean = false;
  hideNavBar: boolean = false;

  routesWithoutFooter = ['/HomeLogin'];
  routesWithoutNavBar = ['/HomeLogin'];

  constructor(private router: Router) {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hideFooter = this.routesWithoutFooter.includes(this.router.url);
        this.hideNavBar = this.routesWithoutNavBar.includes(this.router.url);
      }
    });
  }

}
