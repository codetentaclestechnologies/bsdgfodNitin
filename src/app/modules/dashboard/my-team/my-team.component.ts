import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss']
})
export class MyTeamComponent implements OnInit {
  teamTotalDeposit:any;
  maxDirectDeposit: any;
  otherDirectDeposit:any;
  totalInvited: any;

  constructor(private cs:GlobalService) { }
 async ngOnInit() {
   await  this.cs.connectContract();
   this.updateTeamInfos(0,20)
  }


 async updateTeamInfos(from:number,to:number){
 let teamDeposit =  await this.cs.getTeamDeposit(localStorage.getItem('address'))
    this.maxDirectDeposit = (parseInt(teamDeposit[0])/1000000).toFixed(2);
    this.otherDirectDeposit = (parseInt(teamDeposit[1])/1000000).toFixed(2);
    this.teamTotalDeposit = (parseInt(teamDeposit[2])/1000000).toFixed(2);
  let {teamNum} = await this.cs.userInfo(localStorage.getItem('address'))
  this.totalInvited = teamNum
  }
}
