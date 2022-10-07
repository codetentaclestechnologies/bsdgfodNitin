import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { resolve } from 'path';
import { rejects } from 'assert';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
// import * as TronWeb from 'tronweb'

declare let require: any;
declare let window: any;
const bsg_abi = require('../../../assets/abi/bsg.json');
const erc20_abi = require('../../../assets/abi/erc20_abi.json');

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  // public address: string = 'TPX2d2dCYzooFiyGiA2ohibgcEkANFXmui';
  public _web3: any;
  tronweb: any;
  bsgAddr = environment.bsgAddr;
  usdtAddr = environment.usdtAddr;
  zeroAddr = environment.refererDefault;
  bsg: any;
  usdt: any;
  userAddr = '';
  timeStep = 24 * 60 * 60;
  lang = 'default';
  currentaddress: any;
  url_id: any;

  constructor(private httpClient: HttpClient) {}
  async connectContract() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(async () => {
        this.tronweb = window.tronWeb;
        try {
          let data = await this.tronweb.trx.getBalance(
            this.tronweb.defaultAddress.base58
          );
          this.currentaddress = await this.tronweb.defaultAddress.base58;

          await this.initializeContractObject();
          resolve(this.currentaddress);
        } catch {
          reject(false);
          console.log('Tronweb not defined');
        }
      }, 1000);
    });
    return promise;
  }

  getUplineid(route: ActivatedRoute) {
    let found = false;
    route.params.subscribe(
      (params) => {
        debugger
        if (params['refId'] !== undefined) {
          this.url_id = params['refId'];
          found = true;
        }
      }
    );




    if (localStorage.getItem("upline") != null && localStorage.getItem("upline") !== "undefined" && !found) {
      this.url_id = localStorage.getItem("upline");
    }
    else if (found) {
      localStorage.setItem("upline", this.url_id);
    }
    else if (!found && (localStorage.getItem("upline") === null || localStorage.getItem("upline") === "undefined")) {
      this.url_id = this.zeroAddr;
    }
    return this.url_id;

  }


  async initializeContractObject() {
    this.bsg = await this.tronweb.contract(bsg_abi, this.bsgAddr);
    this.usdt = await this.tronweb.contract(erc20_abi, this.usdtAddr);
  }

  async startTime() {
    return parseInt(await this.bsg.startTime().call()) * 1000;
  }

  async getOrderLength(address: any) {
    return parseInt(await this.bsg.getOrderLength(address).call());
  }
  async orderInfos(userAddr:any,orderLength: any) {
    return await this.bsg.orderInfos(userAddr, orderLength).call();
  }

  async luckPool() {
    return parseInt(await this.bsg.luckPool().call()) / 1000000;
  }
  async starPool() {
    return parseInt(await this.bsg.starPool().call()) / 1000000;
  }
  async topPool() {
    return parseInt(await this.bsg.topPool().call()) / 1000000;
  }
  async totalUser() {
    return parseInt(await this.bsg.totalUser().call());
  }
  async getDepositorsLength() {
    return parseInt(await this.bsg.getDepositorsLength().call());
  }
  async depositors(i: any) {
    return this.tronweb.address.fromHex(
      await this.bsg.depositors(i - 1).call()
    );
  }
  async depositorsAmount(
    userLatestDeposit: any,
    userLatestOrderNum: any,
    userCount: any
  ) {
    return this.bsg
      .orderInfos(userLatestDeposit, userLatestOrderNum - 1 - userCount)
      .call();
  }
  async getCurDay() {
    return parseInt(await this.bsg.getCurDay().call());
  }
  async getDayLuckLength(curDay: any) {
    return parseInt(await this.bsg.getDayLuckLength(curDay).call());
  }
  async dayLuckUsers(curDay: any, i: any) {
    return this.tronweb.address.fromHex(
      await this.bsg.dayLuckUsers(curDay, i - 1).call()
    );
  }
  async dayLuckUsersDeposit(curDay: any, i: any) {
    return (
      parseInt(await this.bsg.dayLuckUsersDeposit(curDay, i - 1).call()) /
      1000000
    ).toFixed(2);
  }
  async dayTopUser(curDay: any, i: any) {
    return this.tronweb.address.fromHex(
      await this.bsg.dayTopUsers(curDay, i).call()
    );
  }
  async lastDistribute() {
    return parseInt(await this.bsg.lastDistribute().call());
  }

  async toSun(input: any) {
    return await this.tronweb.toSun(input);
  }
  async isApprove(userAddress: any, to: any) {
    let res = await this.usdt.allowance(userAddress, to).call();
    var allowanceAmount = parseFloat(res);
    if (allowanceAmount > 5000e6) {
      return true;
    } else {
      return false;
    }
  }

  async depositeAmount(amount: any) {
    return this.bsg.deposit(amount).send({ feeLimit: 5000e6, callValue: 0 });
  }

  async register(address:any)
  {
    return this.bsg.register(address).send({ feeLimit: 5000e6, callValue: 0 });

  }
  async withdrawAmount() {
    return this.bsg.withdraw().send({ feeLimit: 5000e6, callValue: 0 });
  }
  async setApprove(to: any) {
    var amount =
      '115792089237316195423570985008687907853269984665640564039457584007913129639935';
    await this.usdt
      .approve(to, amount)
      .send({ feeLimit: 5000e6, callValue: 0 });
  }

  async updateRewardInfo(userAddr: any) {
    return await this.bsg.rewardInfo(userAddr).call();
  }
  async fromSun(el: any) {
    return await this.tronweb.fromSun(el);
  }

  async fromHex(el: any) {
    return await this.tronweb.address.fromHex(el);
  }


  async userInfo(userAddr: any) {
    return await this.bsg.userInfo(userAddr).call();
  }
  async splitAmount(userAddr: any) {
    return parseInt(await this.bsg.getCurSplit(userAddr).call()) / 1000000;
  }
  async depositBySplit(tAmount: any) {
    return await this.bsg
      .depositBySplit(this.tronweb.toSun(tAmount))
      .send({ feeLimit: 5000e6, callValue: 0 });
  }
  async transferBySplit(receiver: any, tAmount: any, splitAmt: any) {
    if (this.tronweb.isAddress(receiver)) {
      if (
        tAmount >= 50 &&
        tAmount <= 2000 &&
        tAmount % 50 == 0 &&
        tAmount <= splitAmt
      ) {
        return await this.bsg
          .transferBySplit(receiver, this.tronweb.toSun(tAmount))
          .send({ feeLimit: 5000e6, callValue: 0 });
      }
    }
  }

  async getTrxBalance() {
    return parseInt(await this.tronweb.trx.getBalance(localStorage.getItem('address')))/1000000;
  }
  async getUstdBalance() {
    return  parseInt(await this.usdt.balanceOf(localStorage.getItem('address')).call())/1000000;
  }
 async getTeamDeposit (userAddr:any){
    return   await this.bsg.getTeamDeposit(userAddr).call()
  }
 async getDepositeDetailOrederLength(userAddr:any){
  return  parseInt(await this.bsg.getOrderLength(userAddr).call())

  }
}
