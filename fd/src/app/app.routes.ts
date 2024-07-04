import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdduserComponent } from './adduser/adduser.component';
import { WorkComponent } from './work/work.component';
import { EditworkerComponent } from './editworker/editworker.component';
import { AddworkComponent } from './addwork/addwork.component';
import { WorkerdetailsComponent } from './workerdetails/workerdetails.component';
import { CardComponent } from './card/card.component';
import { AuthComponent } from './auth/auth.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  // { 
  //   path: 'auth', 
  //   component: AuthComponent,
  //   children: [
  //     { path: '', component: AuthComponent }
  //   ] 
  // },
  // { 
    // path: 'main', 
    // component: LayoutComponent,
    // children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'adduser', component: AdduserComponent  },
      { path: 'works', component: WorkComponent  },
      { path: 'edituser', component: CardComponent },
      { path: 'addwork', component: AddworkComponent },
      { path: 'workerdetails', component: WorkerdetailsComponent },
      { path: 'editworker', component: EditworkerComponent  }
    // ]
//   },
//   // { path: '', redirectTo: '/auth', pathMatch: 'full' },
//   // { path: '**', redirectTo: '/auth' }
];
