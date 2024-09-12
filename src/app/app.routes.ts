import { Routes } from '@angular/router';
import { HomeLoginComponent } from './authentification/home-login/home-login.component';


export const routes: Routes = [
  { path: 'HomeLogin', component: HomeLoginComponent },
  { path: 'home', loadChildren: () => import('./home/home.route').then(m => m.routes), },
  { path: '**', redirectTo: 'HomeLogin' }
];
