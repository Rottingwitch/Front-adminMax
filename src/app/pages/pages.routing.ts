import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImpresorasComponent } from './impresoras/impresoras.component';

import { AuthGuard } from '../guards/auth.guard';



const routes: Routes = [

    { 
        path: 'dashboard' ,
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
          { path: '', component: DashboardComponent, data: { titulo:'DashBoard' }  },
          { path: 'impresoras', component: ImpresorasComponent,  data: { titulo:'Impresoras' }  },
        ],
    },
    

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
