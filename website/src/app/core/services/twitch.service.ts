import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { ElectronService } from './electron.service';
import { ModalDirective } from '../../shared/directives/modal.directive';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root'
})
export class TwitchService {

  private _connected : boolean = false

  constructor(private electron : ElectronService) { 

    this.electron.on("twitch:connect",()=>{
        this._connected = true;
    })

    this.electron.on("twitch:disconnect",()=>{
        this._connected = false;
    })

    this.electron.invoke("twitch:isconnected").then((val : boolean)=>{
      this._connected = val;
    })
  }

  get connected(){
    return this._connected;
  }

  connect(){
    if(this.connected) return;
    this.electron.send("twitch:connect")
  }
}
