import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.route').then(m => m.routes),
  },
];
