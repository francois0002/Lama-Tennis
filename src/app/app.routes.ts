import { Routes } from '@angular/router';
import { HomeLoginComponent } from './authentification/home-login/home-login.component';


export const routes: Routes = [
  {
    path: 'home-login',
    loadChildren: () => import('./authentification/home-login/home-login.route').then(m => m.homeLoginRoutes)
},
  { path: 'home', loadChildren: () => import('./home/home.route').then(m => m.routes), },
  { path: '**', redirectTo: 'home-login' }
];
