import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImpresorasComponent } from './impresoras/impresoras.component';



const routes: Routes = [

    { 
        path: 'dashboard' ,
        component: PagesComponent,
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
