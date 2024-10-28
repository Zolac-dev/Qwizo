import { Injectable, NgZone } from '@angular/core';
import { ElectronService } from './electron.service';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  id : string = "";
  maximized : boolean = false;

  constructor(private electron : ElectronService,ngZone : NgZone) {
    this.electron.on("window-id",(event : any,id :string)=>{
      this.id = id;
      console.log(`Window ID : ${id}`)
    });

    this.electron.on("windowSizeChange", (event : any, data: any)=>{
      ngZone.run(()=>{
        
        this.maximized = data.isMaximized;

      })
    });
  }

  close(){
    this.electron.send("window-close")
  }

  maximize(){
    this.electron.send("window-maximize")
  }

  unmaximize(){
    this.electron.send("window-unmaximize")
  }

  minimize(){
   this.electron.send("window-minimize")
  }
}
