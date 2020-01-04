import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private _playerReady = false
  private _hasPremium = true;
  private _accessTokenAvailable = false;
  
  statusChanged = new Subject<StatusChange>()

  constructor() { 
  }

  get playerReady(): boolean { return this._playerReady }
  set playerReady(value: boolean){
    this._playerReady = value;
    this.statusChanged.next({field: "playerReady", value: value})
  }

  get hasPremium(): boolean { return this._hasPremium }
  set hasPremium(value: boolean){
    this._hasPremium = value;
    this.statusChanged.next({field: "hasPremium", value: value})
  }

  get accessTokenAvailable(): boolean { return this._accessTokenAvailable }
  set accessTokenAvailable(value: boolean){
    this._accessTokenAvailable = value;
    this.statusChanged.next({field: "accessTokenAvailable", value: value})
  }
}

export interface StatusChange{
  field: "playerReady" | "hasPremium" | "accessTokenAvailable",
  value: any
}

