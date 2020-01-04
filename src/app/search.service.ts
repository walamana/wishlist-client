import { Injectable, ViewChild, ViewContainerRef, AfterViewInit, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService{


  constructor(private http: HttpClient, private auth: AuthService) { }

  search(query): Observable<any>{
    return this.http.get(environment.api_url + "/search?q=" + query, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": this.auth.ticket
      }
    })
  }
}
