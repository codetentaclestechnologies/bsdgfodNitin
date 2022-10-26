import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
  selector: 'app-split-account-dialog',
  templateUrl: './split-account-dialog.component.html',
  styleUrls: ['./split-account-dialog.component.scss'],
})
export class SplitAccountDialogComponent implements OnInit {
  freezingAmt = 0
  tAmount = '0';
  receiver = '';
  constructor(
    private cs: GlobalService,
    private dilogRef: MatDialogRef<SplitAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toster:ToastrService
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  async getUserInfo() {
    let splitAmt = 0;
    let { referrer, start, level, maxDeposit, totalDeposit, totalRevenue } =
      await this.cs.userInfo(localStorage.getItem('address'));
  
    let userMaxDeposit = parseInt(maxDeposit) / 1e18;
    splitAmt = await this.cs.splitAmount(localStorage.getItem('address'))

    this.freezingAmt = splitAmt
  
  }
  async depositeFn(){
    try{
      if(parseInt(this.tAmount) >= 50 && parseInt(this.tAmount)<= 2000 && parseInt(this.tAmount) % 50 == 0 && parseInt(this.tAmount) <= this.freezingAmt){
        debugger
        await this.cs.depositBySplit(parseInt(this.tAmount))
    }
    }catch(e:any){
      console.log(e);
      this.toster.error(e)
    }
  
  }
  async transferFreezing(){
    try{
      debugger
      await this.cs.transferBySplit(this.receiver,parseInt(this.tAmount),this.freezingAmt)
    }catch(e:any){
      console.log(e);
      this.toster.error(e)
    }
  }
}
