import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdduserComponent } from './adduser/adduser.component';
import { WorkComponent } from './work/work.component';
import { AddworkComponent } from './addwork/addwork.component';
import { WorkerdetailsComponent } from './workerdetails/workerdetails.component';
import { CardComponent } from './card/card.component';
import { AuthComponent } from './auth/auth.component';
import { LayoutComponent } from './layout/layout.component';
import { SettingComponent } from './setting/setting.component';
import { AdminComponent } from './admin/admin.component';
import { InchargeComponent } from './incharge/incharge.component';
import {AuthGuardService} from './.serive/authguard.service'

export const routes: Routes = [
  
     

      { path: 'login', component: AuthComponent },
      {
             path: 'admin', component: AdminComponent, 
             canActivate: [AuthGuardService], 
             data: { roles: ['admin'] },
             children:[
                  { path: 'dashboard', component: DashboardComponent },
                  { path: 'adduser', component: AdduserComponent  },
                  { path: 'works', component: WorkComponent  },
                  { path: 'edituser', component: CardComponent },
                  { path: 'addwork', component: AddworkComponent },
                  { path: 'workerdetails', component: WorkerdetailsComponent },
                  { path: 'settings', component: SettingComponent  }
                        ]
            
      },
      { 
            path: 'incharge',
             component: InchargeComponent,
              canActivate: [AuthGuardService],
               data: { roles: ['incharge'] },
               children:[
                  { path: 'dashboard', component: DashboardComponent },
                  { path: 'adduser', component: AdduserComponent  },
                  { path: 'works', component: WorkComponent  },
                  { path: 'edituser', component: CardComponent },
                  { path: 'addwork', component: AddworkComponent },
                  { path: 'workerdetails', component: WorkerdetailsComponent },
                 // { path: 'settings', component: SettingComponent  }
                        ]
            },
      { path: '', redirectTo: '/login', pathMatch: 'full' }

];
