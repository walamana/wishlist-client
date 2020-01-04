import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketValidatorService {

constructor(private http: HttpClient) { }

  validate(ticket: string): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.http.get<any>(environment.api_url + "/ticket/validate?t=" + ticket).subscribe(data => {
        resolve(data.valid)
      })
    })
  }
}
