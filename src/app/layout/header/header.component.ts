import { Component, OnDestroy, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import { GlobalService } from 'src/app/core/services/global.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isConnected = false;
  address: any;
  tronweb: any;
  contractAddress = environment.bsgAddr;
  contractInfo: any;
  runTime: any;
  depositCountDown = 0;
  defaultAccount: any;

  constructor(private cs: GlobalService) {


  }


  ngOnInit(): void {
    this.getAccount();
  }

  connect()
  {
    this.cs.connectContract();
  }

  async getAccount() {
    await this.cs.init();
    this.cs.getWalletObs().subscribe((data: any) => {
      if (ethers.utils.isAddress(data) && data!=this.address) {

        this.address = data;
        this.isConnected = true;
        console.log("connected")
        this.startTime();

      }
      else if(!ethers.utils.isAddress(data)) {
        this.isConnected = false;
      }
    });
  }


  async startTime() {
    try {
      this.runTime = await this.cs.startTime();

    } catch (e) {
      console.log(e);
    }
  }

  async depositeCountDown() {
    try {
      let OrderLength = await this.cs.getOrderLength(this.address);
      if (OrderLength > 0) {
        let unfreeze = await this.cs.orderInfos(this.address, OrderLength)
        this.depositCountDown = parseInt(unfreeze) * 1000
      } else {
        this.depositCountDown = 0
      }
    } catch (e) {
      console.log(e);
    }
  }

}
