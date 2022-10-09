import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router,Event } from '@angular/router';
import { LoginModalComponent } from './login-modal/login-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUrl : string ="";
  constructor(private router:Router, private matDialog:MatDialog) { }

  ngOnInit(): void {

    let slashIndex = this.router.url.lastIndexOf('/');
    this.currentUrl = this.router.url.slice(slashIndex+1);
    

    this.router.events.subscribe((event: Event) => {
    

      if (event instanceof NavigationEnd) {
          // Hide loading indicator
          console.log(event);
          let slashIndex = event.url.lastIndexOf('/');
          this.currentUrl = event.url.slice(slashIndex+1);
        
          
      }

  });

  }

}
