import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ethers } from 'ethers';
// import * as TronWeb from 'tronweb'

declare let require: any;
declare let window: any;

function _window(): any {
  return window;
}


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
  userAddr = '';
  timeStep = 24 * 60 * 60;
  lang = 'default';
  currentaddress: any;
  url_id: any;
  provider: any;
  signer: any;
  mainContract: any;
  usdtContract: any;

  public walletDetails$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private _account: any;

  constructor(private httpClient: HttpClient) { }
  getWalletObs(): Observable<any> {
    return this.walletDetails$.asObservable();
  }

  setWalletObs(profile: any) {
    this.walletDetails$.next(profile);
  }


  async init() {
    let isConnected = localStorage.getItem('wallet') == "1";
    if (isConnected) {
      await this.connectContract();
    }
  }

  async connectContract() {


    if ((typeof this.nativeWindow.ethereum) !== undefined && (typeof this.nativeWindow.ethereum) != undefined && (typeof this.nativeWindow.ethereum) != 'undefined') {
      await this.nativeWindow.ethereum.enable();
      this.provider = new ethers.providers.Web3Provider(this.nativeWindow.ethereum);

      await this.getAccountAddress();
      localStorage.setItem('wallet', '1');

      this.nativeWindow.ethereum.on("accountsChanged", (accounts: string[]) => {
        this.connectContract();
        location.reload();
      });

      this.nativeWindow.ethereum.on("networkChanged", (code: number, reason: string) => {
        this.connectContract();
        location.reload();
      });
    }
  }



  async getAccountAddress() {

    this.signer = this.provider.getSigner();
    this._account = await this.signer.getAddress();
    var network = await this.provider.getNetwork();
    localStorage.setItem('address', this._account);
    if (network.chainId == 97) {//56
      this.mainContract = new ethers.Contract(this.bsgAddr, bsg_abi, this.signer);
      this.usdtContract = new ethers.Contract(this.usdtAddr, erc20_abi, this.signer);
    }
    this.setWalletObs(this._account);
  }

  get nativeWindow(): any {
    return _window();
  }

  async getAccount() {
    return this._account;
  }

  public async getUserBalance() {
    let account = await this.getAccount();
    return account;
  }

  public isValidAddress(address: any) {
    return ethers.utils.isAddress(address);
  }


  getUplineid(route: ActivatedRoute) {
    let found = false;
    route.params.subscribe(
      (params) => {
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

  async startTime() {
    return parseInt(await this.mainContract.startTime()) * 1000;
  }

  async getOrderLength(address: any) {
    return parseInt(await this.mainContract.getOrderLength(address));
  }
  async orderInfos(userAddr: any, orderLength: any) {
    return await this.mainContract.orderInfos(userAddr, orderLength);
  }

  async luckPool() {
    return parseInt(await this.mainContract.luckPool()) / 1e18;
  }
  async starPool() {
    return parseInt(await this.mainContract.starPool()) / 1e18;
  }
  async topPool() {
    return parseInt(await this.mainContract.topPool()) / 1e18;
  }
  async totalUser() {
    return parseInt(await this.mainContract.totalUser());
  }
  async getDepositorsLength() {
    return parseInt(await this.mainContract.getDepositorsLength());
  }
  async depositors(i: any) {
      return await this.mainContract.depositors(i - 1)
  }
  async depositorsAmount(
    userLatestDeposit: any,
    userLatestOrderNum: any,
    userCount: any
  ) {
    return this.mainContract
      .orderInfos(userLatestDeposit, userLatestOrderNum - 1 - userCount)
      ;
  }
  async getCurDay() {
    return parseInt(await this.mainContract.getCurDay());
  }
  async getDayLuckLength(curDay: any) {
    return parseInt(await this.mainContract.getDayLuckLength(curDay));
  }
  async dayLuckUsers(curDay: any, i: any) {
    return await this.mainContract.dayLuckUsers(curDay, i - 1)
  }
  async dayLuckUsersDeposit(curDay: any, i: any) {
    return (
      parseInt(await this.mainContract.dayLuckUsersDeposit(curDay, i - 1)) /
      1e18
    ).toFixed(2);
  }
  async dayTopUser(curDay: any, i: any) {
    return await this.mainContract.dayTopUsers(curDay, i)
  }
  async lastDistribute() {
    return parseInt(await this.mainContract.lastDistribute());
  }

  async toSun(input: any) {
    return await this.tronweb.toSun(input);
  }
  async isApprove(userAddress: any, to: any) {
    let res = await this.usdtContract.allowance(userAddress, to);
    var allowanceAmount = parseFloat(res);
    if (allowanceAmount > 5000e18) {
      return true;
    } else {
      return false;
    }
  }

  async depositeAmount(amount: any) {
    return this.mainContract.deposit(amount);
  }

  async register(address: any) {
    return this.mainContract.register(address);

  }
  async withdrawAmount() {
    return await this.mainContract.withdraw();
  }
  async setApprove(to: any) {
    var amount =
      '115792089237316195423570985008687907853269984665640564039457584007913129639935';
    return await this.usdtContract
      .approve(to, amount);
  }

  async updateRewardInfo(userAddr: any) {
    return await this.mainContract.rewardInfo(userAddr);
  }
  fromSun(el: any) {
    return (el / 1e18) + "";
  }




  async userInfo(userAddr: any) {
    return await this.mainContract.userInfo(userAddr);
  }
  async splitAmount(userAddr: any) {
    return parseInt(await this.mainContract.getCurSplit(userAddr)) / 1e18;
  }
  async depositBySplit(tAmount: any) {
    return await this.mainContract
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
        return await this.mainContract
          .transferBySplit(receiver, this.tronweb.toSun(tAmount))
          .send({ feeLimit: 5000e6, callValue: 0 });
      }
    }
  }


  async getUstdBalance() {
    return parseInt(await this.usdtContract.balanceOf(localStorage.getItem('address'))) / 1e18;
  }
  async getTeamDeposit(userAddr: any) {
    return await this.mainContract.getTeamDeposit(userAddr)
  }
  async getDepositeDetailOrederLength(userAddr: any) {
    return parseInt(await this.mainContract.getOrderLength(userAddr))

  }
}
