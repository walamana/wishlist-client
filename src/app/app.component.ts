
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { NotifyService } from './notify.service';
import { StatusChange, StatusService } from './services/status.service';
import { Router, RoutesRecognized, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'wishlist';

  hasPremium = true
  playerWorking = true

  notification = "";

  activatedRoute;

  constructor(
    private auth: AuthService, 
    private notify: NotifyService,
    private status: StatusService,
    private router: Router){}
  
  ngOnInit(){
    // this.auth.login();
    this.auth.checkForCredentials();

    this.notify.notification.subscribe(notification => {
      if(notification.type == "error"){
        notification = notification.msg;
      }
    })

    this.status.statusChanged.subscribe(change => {
      if(change.field == "hasPremium"){
        console.log(change)
        this.hasPremium = change.value
      }
    })

    this.router.events.subscribe(event => {
      if(event instanceof RoutesRecognized){
        var route = event.state.root.firstChild;
        this.auth.validateTicket(route.params.ticket)
      }else if(event instanceof NavigationEnd){
        this.activatedRoute = this.router.routerState.root.firstChild
      }
    })
  }

  goTo(route){
    console.log(route, this.activatedRoute)
    this.router.navigate(["../" + route], { relativeTo: this.activatedRoute})
  }


}
