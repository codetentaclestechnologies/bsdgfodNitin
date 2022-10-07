import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootHomeComponent } from './layout/root-home/root-home.component';

const routes: Routes = [
  {path:'dashboard/ref/:refId' , loadChildren:()=>import('./modules/dashboard/dashboard.module').then(m=>m.DashboardModule)},
  {path:'dashboard' , loadChildren:()=>import('./modules/dashboard/dashboard.module').then(m=>m.DashboardModule)},
  {path : '' , redirectTo:'/root-home',pathMatch:'full'},
  {path : 'root-home' , component:RootHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
