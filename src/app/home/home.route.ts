import { Routes } from '@angular/router';
import { LamaKesakoComponent } from '../blog-articles/lama-kesako/lama-kesako.component';
import { PromoteLamaTennisComponent } from '../blog-articles/promote-lama-tennis/promote-lama-tennis.component';
import { StartWithLamaComponent } from '../blog-articles/start-with-lama/start-with-lama.component';
import { FaqComponent } from '../menu/faq/faq.component';
import { AuthGuard } from '../guard/auth.guard';
import { JoinClubComponent } from '../join-club/join-club.component';
import { HautsFaitsComponent } from '../main-feature/hauts-faits/hauts-faits.component';
import { MyClubComponent } from '../main-feature/my-club/my-club.component';
import { PoulesComponent } from '../main-feature/poules/poules.component';
import { MyAccountComponent } from '../menu/my-account/my-account.component';
import { ArticlesHomePageComponent } from './home-page/articles-home-page/articles-home-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PartnersComponent } from '../main-feature/partners/partners.component';
import { ResultComponent } from '../main-feature/result/result.component';
import { StatisticsComponent } from '../menu/statistics/statistics.component';
import { ContactUsComponent } from '../menu/contact-us/contact-us.component';
import { PresentationLamaTennisComponent } from '../blog-articles/landing-page/presentation.component';




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
      { path: 'achievements', component: HautsFaitsComponent,canActivate: [AuthGuard]},
      { path: 'poules', component: PoulesComponent, canActivate: [AuthGuard]},
      { path: 'my-club',component: MyClubComponent,canActivate: [AuthGuard]},
      { path: 'partners',component: PartnersComponent,canActivate: [AuthGuard]},
      { path: 'result',component: ResultComponent ,canActivate: [AuthGuard]},
      { path: 'contact-us',component: ContactUsComponent ,canActivate: [AuthGuard]},
      { path: 'statistics',component: StatisticsComponent ,canActivate: [AuthGuard]},
      { path: 'presentation',component: PresentationLamaTennisComponent},
      


    ],
  },
];
