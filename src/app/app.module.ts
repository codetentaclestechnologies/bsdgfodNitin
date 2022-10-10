import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

import { RootHomeComponent } from './layout/root-home/root-home.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
   
    RootHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    ToastrModule.forRoot(
      {  timeOut: 10000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,}
    )
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[]
})
export class AppModule { }
