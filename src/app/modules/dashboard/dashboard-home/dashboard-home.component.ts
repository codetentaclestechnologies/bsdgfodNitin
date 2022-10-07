import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/core/services/global.service';
import { DepositeDialogComponent } from './deposite-dialog/deposite-dialog.component';
import { SplitAccountDialogComponent } from './split-account-dialog/split-account-dialog.component';
import { WithdrawDialogComponent } from './withdraw-dialog/withdraw-dialog.component';
import { environment } from 'src/environments/environment';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
})
export class DashboardHomeComponent implements OnInit {
  luckPool: any;
  starPool: any;
  topPool: any;
  totalUser: any;
  latestDeposit: any;
  luckUsers: any;
  zeroAddr = 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb';
  top3LuckyPlayers: any;
  hourStart: any;
  hourEnd: any;
  minuteStart: any;
  minuteEnd: any;
  secondStart: any;
  secondEnd: any;
  trxbalance: any;
  usdtBalance: any;
  myAddress = ''
  totalWithdrawn:any;
  isConnected = false;
  address: any;
  tronweb: any;
  contractAddress = environment.bsgAddr;
  contractInfo: any;
  runTime: any;
  depositCountDown = 0;
  ref: any;
  referrer: any;
  showRegister: boolean=true;
  constructor(private cs: GlobalService, private dialog: MatDialog , private router:Router,
    route: ActivatedRoute) {
      
      this.ref = this.cs.getUplineid(route);
    }

  async ngOnInit() {
    this.luckUsers = [];
    this.latestDeposit = [];
    this.top3LuckyPlayers = [];
    await this.cs.connectContract();
    this.luckPoolFn();
    this.starPoolfn();
    this.topPoolfn();
    this.totalUserFn();
    this.getDespositors();
    this.luckyPlayes();
    this.top3LuckyPlayer();
    this.lotteryCountdown();
    this.getbalance()
    this.getIncome()
    this.myAddress = `${location.origin}/dashboard/ref/${localStorage.getItem('address')}`
  }

  async getbalance() {
    this.trxbalance = await this.cs.getTrxBalance();
    this.usdtBalance = await this.cs.getUstdBalance();
  }
  async luckPoolFn() {
    this.luckPool = (await this.cs.luckPool()).toFixed(2);
  }
  async starPoolfn() {
    this.starPool = (await this.cs.starPool()).toFixed(2);
  }
  async topPoolfn() {
    this.topPool = (await this.cs.topPool()).toFixed(2);
  }
  async totalUserFn() {
    this.totalUser = await this.cs.totalUser();
  }
  async getDespositors() {
    let depositCount = await this.cs.getDepositorsLength();
    var recycle = 10;
    if (depositCount < recycle) {
      recycle = depositCount;
    }
    var userMap = new Map();
    for (var i = depositCount; i > depositCount - recycle; i--) {
      let userLatestDeposit = await this.cs.depositors(i);
      if (!userMap.has(userLatestDeposit)) {
        userMap.set(userLatestDeposit, 0);
      } else {
        var val = userMap.get(userLatestDeposit);
        userMap.set(userLatestDeposit, val + 1);
      }
      var userCount = userMap.get(userLatestDeposit);
      var userLatestOrderNum = await this.cs.getOrderLength(userLatestDeposit);
      var { amount, start } = await this.cs.depositorsAmount(
        userLatestDeposit,
        userLatestOrderNum,
        userCount
      );
      var latestAmount = parseInt(amount) / 1000000;
      let date = this.getDate(parseInt(start) * 1000);
      this.latestDeposit.push({
        amount: latestAmount,
        userAddress: userLatestDeposit,
        date: date,
      });
      if (this.latestDeposit.length > 10) {
        this.latestDeposit.shift();
      }
    }
  }
async getIncome(){
  let { referrer, start, level, maxDeposit, totalDeposit, totalRevenue } =
  await this.cs.userInfo(localStorage.getItem('address'));
  this.totalWithdrawn = await this.cs.fromSun(totalRevenue);
  this.referrer =await this.cs.fromHex(referrer);
  
  if(this.referrer!=this.zeroAddr)
  {
    this.showRegister = false;
  }
}
  async luckyPlayes() {
    let curDay = await this.cs.getCurDay();
    let dayLuckLength = await this.cs.getDayLuckLength(curDay);
    var checkCount = 10;
    if (dayLuckLength < 10) {
      checkCount = dayLuckLength;
    }

    for (var i = dayLuckLength; i > dayLuckLength - checkCount; i--) {
      var luckUser = await this.cs.dayLuckUsers(curDay, i);
      var luckDeposit = await this.cs.dayLuckUsersDeposit(curDay, i);
      this.luckUsers.push({ userAddress: luckUser, amount: luckDeposit });
      if (this.luckUsers.length > 10) {
        this.luckUsers.shift();
      }
    }
    console.log(this.luckUsers);
  }

  async top3LuckyPlayer() {
    let curDay = await this.cs.getCurDay();
    for (var i = 0; i < 3; i++) {
      var dayTopUser = await this.cs.dayTopUser(curDay, i);
      if (dayTopUser != this.zeroAddr) {
        this.top3LuckyPlayers.push(dayTopUser);
      } else {
        break;
      }
    }
  }
  async lotteryCountdown() {
    let lastDistribute = await this.cs.lastDistribute();
    setInterval(async () => {
      var nowTime = new Date().getTime() / 1000;
      var disTime = lastDistribute + 24 * 60 * 60;
      var leftTime = disTime - nowTime;

      if (leftTime > 0) {
        let leftHours = Math.floor(leftTime / 3600);
        if (leftHours >= 10) {
          this.hourStart = Math.floor(leftHours / 10);
          this.hourEnd = Math.floor(leftHours % 10);
        } else {
          this.hourStart = 0;
          this.hourEnd = leftHours;
        }
        let leftMinutes = Math.floor((leftTime % 3600) / 60);
        if (leftMinutes >= 10) {
          this.minuteStart = Math.floor(leftMinutes / 10);
          this.minuteEnd = Math.floor(leftMinutes % 10);
        } else {
          this.minuteStart = 0;
          this.minuteEnd = leftMinutes;
        }

        let leftSeconds = Math.floor((leftTime % 3600) % 60);
        if (leftSeconds >= 10) {
          this.secondStart = Math.floor(leftSeconds / 10);
          this.secondEnd = Math.floor(leftSeconds % 10);
        } else {
          this.secondStart = 0;
          this.secondEnd = leftSeconds;
        }
      }
    }, 1000);
  }

  deposite() {
    this.dialog.open(DepositeDialogComponent, {
      panelClass: 'bg',
    });
  }

  register() {
    this.dialog.open(RegisterDialogComponent, {
      panelClass: 'bg',
      data:this.ref
    });
  }

  withdraw() {
    this.dialog.open(WithdrawDialogComponent, {
      panelClass: 'bg',
    });
  }
  splitAccount() {
    this.dialog.open(SplitAccountDialogComponent, {
      panelClass: 'bg',
    });
  }
  getDate(timstamp: any) {
    var date = new Date(timstamp);
    var year = date.getFullYear(); // 获取完整的年份(4位,1970)
    var month = date.getMonth() + 1; // 获取月份(0-11,0代表1月,用的时候记得加上1)
    var day = date.getDate(); // 获取日(1-31)
    var hour = date.getHours(); // 获取小时数(0-23)
    var minute = date.getMinutes(); // 获取分钟数(0-59)
    var second = date.getSeconds(); // 获取秒数(0-59)
    var forMatDate =
      year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    return forMatDate;
  }
 
  async connect() {
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
