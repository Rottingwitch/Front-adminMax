import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { RouterModule } from "@angular/router";

import { DashboardComponent } from './dashboard/dashboard.component';
import { ImpresorasComponent } from './impresoras/impresoras.component';
import { PagesComponent } from './pages.component';



@NgModule({
  declarations: [
    ImpresorasComponent,
    DashboardComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    ImpresorasComponent,
    DashboardComponent,
    PagesComponent
  ]
})
export class PagesModule { }
