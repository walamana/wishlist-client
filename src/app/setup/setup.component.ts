import { Component, OnInit } from '@angular/core';
import { MusicProviders } from '../provider/music.provider';
import { Router } from '@angular/router';
import { TicketValidatorService } from '../provider/ticket/ticketValidator.service';
import { StatusService } from '../services/status.service';
import { AuthService } from '../auth.service';
import { getAuthorizer } from '../auth/auth';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.less']
})
export class SetupComponent implements OnInit {

  setupStep = 0;

  provider: MusicProviders

  // Ticket
  ticket: string = ""
  ticketValid: boolean = false;

  constructor(
    private router: Router,
    private ticketValidator: TicketValidatorService,
    private status: StatusService,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  setProvider(provider){
    this.provider = provider;
    this.setupStep++;
  }


  onTicketInput(event){
    var value = event.target.value;
    if(value != ""){
      this.ticket = value;
      this.ticketValidator.validate(value).then(valid => {
        this.ticketValid = valid;
      })
    }
  }

  enterRoom(){
    this.router.navigateByUrl("/room/" + this.ticket + "/player/search")
  }


  loginWithSpotify(){
    getAuthorizer(this.provider)();
  }

}
