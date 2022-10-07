import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
  selector: 'app-withdraw-dialog',
  templateUrl: './withdraw-dialog.component.html',
  styleUrls: ['./withdraw-dialog.component.scss'],
})
export class WithdrawDialogComponent implements OnInit {
  rewardInfo: any;
  constructor(
    private cs: GlobalService,
    private dilogRef: MatDialogRef<WithdrawDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.rewardInfo = [];
    this.getRewardInfo();
  }

  async getRewardInfo() {
    let demo = await this.cs.updateRewardInfo(localStorage.getItem('address'));
    console.log(demo);

    
    let capitals = parseFloat(await this.cs.fromSun(demo.capitals));
    let directs = parseFloat(await this.cs.fromSun(demo.directs)) * 0.7;
    let level4Freezed =
      parseFloat(await this.cs.fromSun(demo.level4Freezed)) * 0.7;
    let level4Released =
      parseFloat(await this.cs.fromSun(demo.level4Released)) * 0.7;
    let level5Freezed =
      parseFloat(await this.cs.fromSun(demo.level5Freezed)) * 0.7;
    let level5Left =
      parseFloat(await this.cs.fromSun(demo.level5Left)) * 0.7;
    let level5Released =
      parseFloat(await this.cs.fromSun(demo.level5Released)) * 0.7;
    let luck = parseFloat(await this.cs.fromSun(demo.luck)) * 0.7;
    let split = parseFloat(await this.cs.fromSun(demo.split)) * 0.7;
    let splitDebt = parseFloat(await this.cs.fromSun(demo.splitDebt)) * 0.7;
    let star = parseFloat(await this.cs.fromSun(demo.star)) * 0.7;
    let statics = parseFloat(await this.cs.fromSun(demo.statics)) * 0.7;
    let top = parseFloat(await this.cs.fromSun(demo.top)) * 0.7;
    this.rewardInfo.push({
      capitals: capitals,
      statics: statics,
      directs: directs,
      level4Released: level4Released,
      level5Left: level5Left,
      level5Released: level5Released,
      level5Freezed: level5Freezed,
      star: star,
      luck: luck,
      top: top,
    });
    console.log(this.rewardInfo);
  }

  async withdrawAmount() {
    await this.cs.withdrawAmount();
    await this.sleep(2000).then(async () => {
      location.reload();
    });
  }
  sleep(ms: any) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
