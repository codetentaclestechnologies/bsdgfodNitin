import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/core/services/global.service';
import $ from 'jquery';
@Component({
  selector: 'app-deposite-details',
  templateUrl: './deposite-details.component.html',
  styleUrls: ['./deposite-details.component.scss'],
})
export class DepositeDetailsComponent implements OnInit {
  depositeTableData: any;
  constructor(private cs: GlobalService) {}
  isShowStatus = false
  async ngOnInit() {
    this.depositeTableData =[]
    await this.cs.connectContract();

    this.updateOrders();

  }

  async updateOrders() {
    let length = await this.cs.getDepositeDetailOrederLength(
      localStorage.getItem('address')
    );
    
    for (let i = length - 1; i >= 0; i--) {
      var { amount, start, unfreeze, isUnfreezed } = await this.cs.orderInfos(
        localStorage.getItem('address'),
        i
      );
      var dAmt = await this.cs.fromSun(amount);
      var startTS = parseInt(start) * 1000;
      var startDate = this.getDate(startTS);
      var unfreezeTS = parseInt(unfreeze) * 1000;
      var unfreezeDate = this.getDate(unfreezeTS);

    

      // 周期收益
      var income =await this.cs.fromSun((parseInt(amount) * 225) / 1000);
  
      var date = new Date();
      var timeNow = date.getTime();
      var status = '';
      if (timeNow < unfreezeTS) {
        status = 'Freezing';
      } else {
        if (isUnfreezed) {
          status = 'Completed';
        } else {
          status = 'Unbonded';
        }
      }
      this.depositeTableData.push({amount:dAmt,startDate:startDate,unfreezeDate:unfreezeDate,income:income,status:status})
    }
  }
  isShowStatusFn(){
    this.isShowStatus = this.isShowStatus==true ? this.isShowStatus=false : this.isShowStatus= true
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
}
