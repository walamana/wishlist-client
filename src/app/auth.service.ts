import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { environment } from 'src/environments/environment';
import { StatusService } from './services/status.service';
import { Router, RoutesRecognized } from '@angular/router';

const API = "http://localhost:8080"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  accessToken = ""
  refreshToken = ""

  ticket = ""

  constructor(private http: HttpClient, private status: StatusService, private router: Router) { 
    router.events.subscribe(event => {
      if(event instanceof RoutesRecognized){
        var route = event.state.root.firstChild;
        if(route.queryParams.access_token){
          this.setAccessToken(route.queryParams.access_token)
        }else{
          this.accessToken = window.sessionStorage.getItem("access_token")
          if(this.accessToken){
            this.status.accessTokenAvailable = true;
          }
        }
      }
    })
  }

  login(){
    console.log("Logging in")
    window.location.assign("http://localhost:8080/login")
  }

  checkForCredentials(){
    var params = new URLSearchParams(window.location.search)
    if(params.get("d")){
      var data = JSON.parse(params.get("d"))
      window.sessionStorage.setItem("access_token", data.access_token)
      window.sessionStorage.setItem("refresh_token", data.refresh_token);
      
    }
    if(params.get("t")){
      window.sessionStorage.setItem("token", params.get("t"))
    }
    if(params.get("t") || params.get("d")){
      window.location.assign("http://localhost:4200")
    }
    this.refreshToken = window.sessionStorage.getItem("refresh_token")
    this.ticket = window.sessionStorage.getItem("ticket")

  }

  validateTicket(ticket: string): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.http.get<any>(environment.api_url + "/ticket/validate?t=" + ticket).subscribe(data => {
        resolve(data.valid)
        if(data.valid){
          this.setTicket(ticket)
          this.status.playerReady = true;
        }
      })
    })
  }


  setTicket(ticket: string){
    window.sessionStorage.setItem("ticket", ticket)
    this.ticket = ticket;
  }

  setAccessToken(token: string){
    window.sessionStorage.setItem("access_token", token)
    this.accessToken = token;
    this.status.accessTokenAvailable = true;
  }


}
