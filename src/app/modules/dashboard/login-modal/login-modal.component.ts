import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  constructor(private matDialog:MatDialog) { }

  ngOnInit(): void {
  }


  openRegisterDialog(){
    this.matDialog.open(RegisterDialogComponent)
  }
}
