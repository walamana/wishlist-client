import { Component, OnInit, HostListener, HostBinding } from '@angular/core';
import { PlayerService } from '../player.service';
import { NotifyService } from '../notify.service';
import { StatusService } from '../services/status.service';
import { SpotifyPlayer } from '../provider/spotify_local/spotify.player';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute, ParamMap, RoutesRecognized } from '@angular/router';

declare var _spotify_sdk_ready: boolean

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.less']
})
export class PlayerComponent implements OnInit {

  @HostBinding("class.visible") visible = false;

  trackImage = ""
  trackName = ""
  trackAlbum = ""
  trackArtist = ""
  timeTotal = 0;
  time = 0;
  progress = 0

  device: any 

  queue = []

  mode = "player"

  requestTimeout = null;

  constructor(
    private status: StatusService,
    private player: PlayerService, 
    private notify: NotifyService,
    private auth: AuthService,
    private router: Router) { 
    setInterval(() => {
      this.progress += 1000;
    }, 1000)
  }

  ngOnInit() {
    
    this.status.statusChanged.subscribe(change => {
      if(change.field == "playerReady"){
        this.visible = change.value
      }
      if(change.field == "accessTokenAvailable"){
        var checkIfReady = setInterval(() => {
            if(_spotify_sdk_ready){
              clearInterval(checkIfReady);
              this.setupWebPlayback();
            }
        }, 100)
      }
    })


    this.router.events.subscribe(event => {
      if(event instanceof RoutesRecognized){
        var route = event.state.root.firstChild;
        this.mode = route.params.mode
        if(this.mode == "host" || this.mode == "player"){
          this.requestCurrentState();
        }
      }
    })

    this.notify.notification.subscribe(notification => {
      if(notification.type == "requestCurrentState"){
        this.requestCurrentState();
      }
    })
  }

  setupWebPlayback(){
        console.log("Initializing player with ", this.auth.accessToken)
        var player = new SpotifyPlayer()
        player.init(this.auth.accessToken)
        player.stateChanged.subscribe(() => { 
          console.log("Requesting current state")
          this.requestCurrentState() 
        })
  }

  
  removeFromQueue(index){
    console.log("removing", index)
    this.player.removeFromQueue(index).subscribe( data => {
      console.log(data)
      this.requestCurrentState()
    })
  }

  requestCurrentState(){
    if(this.requestTimeout != null){
      clearTimeout(this.requestTimeout)
    }
    this.player.player().subscribe(data => {if(data) this.device = data.device})
    this.player.currentlyPlaying().subscribe(res => {
      var timeout = 1000;
      var data = res.playing;
      this.queue = res.queue;
      if(data != null && data != "" && data.is_playing){
      // console.log(data)
        this.trackName = data.item.name;
        this.trackAlbum = data.item.album.name;
        this.trackArtist = data.item.artists[0].name;
        this.trackImage = data.item.album.images[0].url;
        this.timeTotal = data.item.duration_ms;
        this.progress = data.progress_ms;
        
        this.requestTimeout = setTimeout(() => {
          this.requestCurrentState();
        }, timeout)
      }else{
        this.player.notifyPlaybackStopped().subscribe(notified => {
          if(!notified.noticed || notified.error){
            // console.log("Notified", notified)
            if(notified.reason == "PREMIUM_REQUIRED"){
              this.status.hasPremium = false;
            }else{
              this.requestTimeout = setTimeout(() => {
                this.requestCurrentState();
              }, 3000)
            }
            this.notify.notification.next({
              type: "error",
              msg: "Could not start the track"
            })
          }
        })
      }
    })
  }

  get progressStyle(){
    return ( 100 * this.progress / this.timeTotal) + "%"
  }

}
