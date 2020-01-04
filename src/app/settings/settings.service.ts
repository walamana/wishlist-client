import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

constructor(private auth: AuthService, private http: HttpClient) { }

getSettings(): Observable<any>{
  return this.http.get<any>(environment.api_url + "/settings", {
    headers: this.header()
  })
}

setProperty(property, value): Observable<any>{
  return this.http.put<any>(environment.api_url + "/settings/set", {
    property: property,
    value: value
  }, {
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
