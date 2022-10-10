import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ethers } from 'ethers';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/core/services/global.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-deposite-dialog',
  templateUrl: './deposite-dialog.component.html',
  styleUrls: ['./deposite-dialog.component.scss'],
})
export class DepositeDialogComponent implements OnInit {
  depositeAmount = 0;
  total = 0;
  userMaxDeposit = 0;
  inputOk = false;
  constructor(
    public dilogRef: MatDialogRef<DepositeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cs: GlobalService,
    private toster:ToastrService
  ) {
  
  }

  ngOnInit(): void {
  
  }

  numberOnly(event: any): boolean {
    
    if (event.target.value !== '') {
      this.depositeAmount = parseInt(event.target.value);
      this.total = (this.depositeAmount * 200) / 1000 + this.depositeAmount;
      
    } else {
      this.depositeAmount = 0;
      this.total = 0;
    }
    return true;
  }

  async depositeConfirm() {
    try{
    if (
      this.depositeAmount % 50 == 0 &&
      this.depositeAmount >= 50 &&
      this.depositeAmount >= this.userMaxDeposit
    ) {
      if (this.depositeAmount <= 2000) {
        this.inputOk = true;
      } else {
        this.inputOk = false;
      }
    } else {
      this.inputOk = false;
    }
    if (this.inputOk) {
      let amount =  ethers.utils.parseEther(this.depositeAmount+"");
      let isAppr = await this.cs.isApprove(localStorage.getItem('address'),environment.bsgAddr);
      if(isAppr){
        let txn:any =  await this.cs.depositeAmount(amount)
        await txn.wait(3);
        location.reload();
    }else{
       let txn:any = await this.cs.setApprove(environment.bsgAddr);
        await txn.wait(3);
        txn = await this.cs.depositeAmount(amount)
        await txn.wait(3);
        location.reload();
    }
    }
  }catch(e:any){
    console.log(e);
    this.toster.error(e)
  }
  }
   sleep(ms:any) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
}
