import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators"
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

constructor(private http: HttpClient, private auth: AuthService) { }


  getPlaylist(): Observable<any>{
    return this.http.get<any>(environment.api_url + "/playlists", {
      headers: this.header()
    })
  }

  getPlaylists(): Observable<any>{
    return this.http.get<any>(environment.api_url + "/playlist/get", {
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
