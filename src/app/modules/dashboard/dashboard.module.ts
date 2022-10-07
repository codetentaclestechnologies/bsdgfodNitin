import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DepositeDialogComponent } from './dashboard-home/deposite-dialog/deposite-dialog.component';
import { FormsModule } from '@angular/forms';
import { WithdrawDialogComponent } from './dashboard-home/withdraw-dialog/withdraw-dialog.component';
import { SplitAccountDialogComponent } from './dashboard-home/split-account-dialog/split-account-dialog.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { DepositeDetailsComponent } from './deposite-details/deposite-details.component';
import { TimerCountDownComponent } from 'src/app/layout/header/timer-count-down/timer-count-down.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { LoginModalComponent } from './login-modal/login-modal.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MyTeamComponent,
    DashboardHomeComponent,
    DepositeDialogComponent,
    WithdrawDialogComponent,
    SplitAccountDialogComponent,
    DepositeDetailsComponent,
    TimerCountDownComponent,
    RegisterDialogComponent,
    LoginModalComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatDialogModule,
    FormsModule,
    ClipboardModule,
  

  ]
})
export class DashboardModule { }
