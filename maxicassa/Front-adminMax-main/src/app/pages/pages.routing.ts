import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImpresorasComponent } from './impresoras/impresoras.component';

import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { ImpresoraComponent } from './mantenimientos/impresora/impresora.component';



const routes: Routes = [

    { 
        path: 'dashboard' ,
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
          { path: '', component: DashboardComponent, data: { titulo:'DashBoard' }  },
          { path: 'impresoras', component: ImpresorasComponent,  data: { titulo:'Impresoras' }  },
          { path: 'impresora/:id', component: ImpresoraComponent,  data: { titulo:'Impresoras' }  },
          { path: 'perfil', component: PerfilComponent,  data: { titulo:'Perfil de Usuario' }  },
        ],
    },
    

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
