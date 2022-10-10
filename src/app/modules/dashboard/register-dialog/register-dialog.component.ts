import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/core/services/global.service';
import { environment } from 'src/environments/environment';
import { DepositeDialogComponent } from '../dashboard-home/deposite-dialog/deposite-dialog.component';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {
  depositeAmount = 0;
  
  total = 0;
  userMaxDeposit = 0;
  inputOk = false;
  ref: any;
  constructor(
    public dilogRef: MatDialogRef<DepositeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cs: GlobalService
  ) {
    
  }

  ngOnInit(): void {}

  

  async depositeConfirm() {
    
    try{
      let txn:any = await this.cs.register(this.data);
      await txn.wait(3);
            location.reload()
      
    
    
  }catch(e){
    console.log(e);
    
  }
  }
   sleep(ms:any) {
    return new Promise(resolve => setTimeout(resolve, ms))
}


}
