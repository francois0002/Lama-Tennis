import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ArticlesHomePageComponent } from './home-page/articles-home-page/articles-home-page.component';
import { JoinClubComponent } from '../join-club/join-club.component';


export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
   children:[
      {
        path: '',
        component: ArticlesHomePageComponent
      },
      {
        path: 'join-club',
        component: JoinClubComponent
      }
   ]
  },
];
