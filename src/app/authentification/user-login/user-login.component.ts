import { Component } from '@angular/core';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

  signupusers : any = [] = [];
  signupObj : any = {
    firstName: "",
    LastName: "",
    email: "",
    password: "",
    phone: "",
    level: "",
    ranking: "",
  };
  loginObj : any = {
    email: "",
    password: "",
  }

  constructor() {}
  ngOnInit(): void{

  }

}
