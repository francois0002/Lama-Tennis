/* This component is used to display the login and registration form in the home-login
(first entry point of the home-login).*/

import { Component } from '@angular/core';
import { UserLoginComponent } from '../../user-login/user-login.component';



@Component({
  selector: 'app-step-0-home-login',
  standalone: true,
  templateUrl: './step0-home-login.component.html',
  styleUrl: './step0-home-login.component.css',
  imports: [UserLoginComponent]
})
export class Step0HomeLoginComponent {

}
