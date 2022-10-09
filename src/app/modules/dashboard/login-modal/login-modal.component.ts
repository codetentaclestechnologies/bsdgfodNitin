import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  constructor(private matDialog:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }


  openRegisterDialog(){
    
    this.matDialog.open(RegisterDialogComponent,
      {
        panelClass: 'bg',
        data:this.data
      })
  }
}
