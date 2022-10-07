import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardComponent } from './dashboard.component';
import { DepositeDetailsComponent } from './deposite-details/deposite-details.component';
import { MyTeamComponent } from './my-team/my-team.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
   children:[
    {path:'',component:DashboardHomeComponent},
    {path:'my-team',component:MyTeamComponent},
    {path:'deposite-details',component:DepositeDetailsComponent},
   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
