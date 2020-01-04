import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

const API = "http://localhost:8080"

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient, private auth: AuthService) { }


  currentlyPlaying(): Observable<any>{
    return this.http.get(API + "/player/currently-playing", {
      headers: this.header()
    })
  }

  player(): Observable<any>{
    return this.http.get(API + "/player", {
      headers: this.header()
    })
  }
  
  addToQueue(item): Observable<any>{
    console.log(item);
    return this.http.put(API + "/player/queue/add", {
      image: item.album.images[0].url,
      title: item.name,
      artist: item.artists[0].name,
      uri: item.uri
    }, {
      headers: this.header()
    })
  }

  removeFromQueue(index): Observable<any>{
    return this.http.put(API + "/player/queue/remove", {
      index: index,
    }, {
      headers: this.header()
    })
  }

  notifyPlaybackStopped(): Observable<any>{
    return this.http.get(API + "/player/notify", {
      headers: this.header()
    })
  }

  playTrack(trackId, device): Observable<any>{
    var deviceURL = device ? "&device=" + device : ""
    return this.http.get(API + "/player/play?track=" + trackId + deviceURL, {
      headers: this.header()
    })
  }


  header(){
    return {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": this.auth.ticket
    }
  }
}
