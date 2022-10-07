import { Component, OnDestroy, OnInit } from '@angular/core';
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
    
    this.connect();
  }
  async connect() {
    await this.cs.connectContract();
    this.defaultAccount = localStorage.getItem('address') ?? "";
    this.tronweb = this.cs.tronweb;
    window.addEventListener('message', (res) => {
      
      if (res.data.message && res.data.message.action == "setAccount") {
        
        if (this.tronweb) {
          debugger
          if (this.defaultAccount!="" && res.data.message.data.address != this.defaultAccount) {
            window.location.reload();
          }
        } 
      }
  });
    await this.getaccount();
  }

  async getaccount() {
    await this.cs
      .connectContract()
      .then(async (balance) => {
        this.address = balance;
        console.log(this.tronweb);

        this.isConnected = true;
        localStorage.setItem('address', this.address);

        this.startTime();
      })
      .catch((error) => (this.isConnected = error));
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
      if(OrderLength>0){
        let unfreeze = await this.cs.orderInfos(this.address,OrderLength)
        this.depositCountDown  = parseInt(unfreeze)*1000
      }else {
        this.depositCountDown = 0
      }
    } catch (e) {
      console.log(e);
    }
  }

}
