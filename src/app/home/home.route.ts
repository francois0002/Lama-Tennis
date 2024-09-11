import { Routes } from '@angular/router';
import { HomeLoginComponent } from '../authentification/home-login/home-login.component';
import { InscriptionComponent } from '../authentification/inscription/inscription-main/inscription-main.component';
import { LamaKesakoComponent } from '../blog-articles/lama-kesako/lama-kesako.component';
import { PromoteLamaTennisComponent } from '../blog-articles/promote-lama-tennis/promote-lama-tennis.component';
import { StartWithLamaComponent } from '../blog-articles/start-with-lama/start-with-lama.component';
import { FaqComponent } from '../faq/faq.component';
import { JoinClubComponent } from '../join-club/join-club.component';
import { HautsFaitsComponent } from '../main-feature/hauts-faits/hauts-faits.component';
import { MyClubComponent } from '../main-feature/my-club/my-club.component';
import { PoulesComponent } from '../main-feature/poules/poules.component';
import { MyAccountComponent } from '../my-account/my-account.component';
import { ArticlesHomePageComponent } from './home-page/articles-home-page/articles-home-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from '../guard/auth.guard';



export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      { path: '',component: ArticlesHomePageComponent,canActivate: [AuthGuard]},
      { path: 'join-club', component: JoinClubComponent,canActivate: [AuthGuard]},
      { path: 'lama-kesako', component: LamaKesakoComponent,canActivate: [AuthGuard]},
      { path: 'faq', component: FaqComponent,canActivate: [AuthGuard]},
      { path: 'my-account', component: MyAccountComponent,canActivate: [AuthGuard] },
      { path: 'promote-lama-tennis', component: PromoteLamaTennisComponent, canActivate: [AuthGuard]},
      { path: 'start-lama-tennis', component: StartWithLamaComponent,canActivate: [AuthGuard] },
      { path: 'hauts-faits', component: HautsFaitsComponent,canActivate: [AuthGuard]},
      { path: 'poules', component: PoulesComponent, canActivate: [AuthGuard]},
      { path: 'my-club',component: MyClubComponent,canActivate: [AuthGuard]},
      { path: 'inscription', component: InscriptionComponent },
      { path: 'HomeLogin', component: HomeLoginComponent  }
    ],
  },
  { path: '**', redirectTo: 'home-login' } // Redirige vers la page de connexion pour les routes non définies
];
