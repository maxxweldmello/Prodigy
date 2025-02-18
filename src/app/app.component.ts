import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, GuardsCheckStart, GuardsCheckEnd } from '@angular/router';
import { UserService } from './users/user.service';

@Component({
  selector: 'gdtc-pm-root',
  templateUrl: './app.component.html',
  styleUrls: ["./app.component.css"]
})

export class AppComponent implements OnInit{
  pageTitle: string = 'GDTC Product Management';

  constructor(
    private router: Router,
    private userService: UserService
  ){}

  showLoader: boolean = false;

  ngOnInit(){
    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationStart){
        this.showLoader = true
      }
      if(event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError){
        this.showLoader = false
      }
    })
    }

  logOut() {
    this.userService.logout();
    this.router.navigateByUrl('/login')
  }
}