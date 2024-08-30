import { Routes } from '@angular/router';
import { JoinClubComponent } from './join-club/join-club.component';


export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.route').then(m => m.routes),
  },
];
