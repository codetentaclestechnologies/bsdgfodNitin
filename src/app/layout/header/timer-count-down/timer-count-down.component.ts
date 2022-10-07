import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer-count-down',
  templateUrl: './timer-count-down.component.html',
  styleUrls: ['./timer-count-down.component.scss']
})
export class TimerCountDownComponent implements OnInit ,OnDestroy{
@Input() time:any
  runTime: any;
  interval!: Subscription;
  constructor() { }

  ngOnInit(): void {
    this.formatDate(this.time)
    
  }
  ngOnDestroy(): void {
    this.interval.unsubscribe();
  }

  formatDate(startTime: any) {
    this.interval = interval().subscribe(() => {
      let endTime = new Date().getTime();
      if (startTime < endTime) {
        var perDay = 24 * 60 * 60 * 1000;
        var perHour = 60 * 60 * 1000;
        var perMinute = 60 * 1000;
        var compareTime = endTime - startTime; // 时间差
        var day: any = Math.floor(compareTime / perDay);
        var hours: any = Math.floor((compareTime % perDay) / perHour);
        var miniutes: any = Math.floor(
          ((compareTime % perDay) % perHour) / perMinute
        );

        if (day < 10) {
          day = '0' + day;
        }

        if (hours < 10) {
          hours = '0' + hours;
        }

        if (miniutes < 10) {
          miniutes = '0' + miniutes;
        }
        this.runTime = day + ':' + hours + ':' + miniutes;
      } else {
        this.runTime = '00:00:00';
      }
    });
  }
}
