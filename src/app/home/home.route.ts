import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ArticlesHomePageComponent } from './home-page/articles-home-page/articles-home-page.component';
import { JoinClubComponent } from '../join-club/join-club.component';
import { LamaKesakoComponent } from '../blog-articles/lama-kesako/lama-kesako.component';
import { FaqComponent } from '../faq/faq.component';
import { MyAccountComponent } from '../my-account/my-account.component';
import { PromoteLamaTennisComponent } from '../blog-articles/promote-lama-tennis/promote-lama-tennis.component';
import { StartWithLamaComponent } from '../blog-articles/start-with-lama/start-with-lama.component';
import { HautsFaitsComponent } from '../main-feature/hauts-faits/hauts-faits.component';
import { PoulesComponent } from '../main-feature/poules/poules.component';
import { MyClubComponent } from '../main-feature/my-club/my-club.component';
import { InscriptionComponent } from '../login/inscription/inscription-step1/inscription.component';
import { InscriptionStep2Component } from '../login/inscription/inscription-step2/inscription-step2.component';
import { InscriptionStep3Component } from '../login/inscription/inscription-step3/inscription-step3.component';
import { HomeLoginComponent } from '../login/home-login/home-login.component';



export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      { path: '',component: ArticlesHomePageComponent,},
      { path: 'join-club', component: JoinClubComponent,},
      { path: 'lama-kesako', component: LamaKesakoComponent,},
      { path: 'faq', component: FaqComponent,},
      { path: 'my-account', component: MyAccountComponent, },
      { path: 'promote-lama-tennis', component: PromoteLamaTennisComponent, },
      { path: 'start-lama-tennis', component: StartWithLamaComponent, },
      { path: 'hauts-faits', component: HautsFaitsComponent,},
      { path: 'poules', component: PoulesComponent },
      { path: 'my-club',component: MyClubComponent,},
      { path: 'InscriptionStep1', component: InscriptionComponent  },
      { path: 'InscriptionStep2', component: InscriptionStep2Component  },
      { path: 'InscriptionStep3', component: InscriptionStep3Component  },
      { path: 'HomeLogin', component: HomeLoginComponent  }
    ],
  },
];
