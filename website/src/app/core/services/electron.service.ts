import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {

  handlers : Map<string,(...args: any[]) => Promise<any>> = new Map<string,(...args: any[]) => Promise<any>>()
  handlersOnce : Map<string,(...args: any[]) => Promise<any>> = new Map<string,(...args: any[]) => Promise<any>>()

  constructor(private ngZone : NgZone) {
    this.on("invoke", async (ev, msg : {idInvoke : string, eventName : string, args : any[]})=>{
      ngZone.run(async ()=>{
        let handler = this.handlers.get(msg.eventName)??this.handlersOnce.get(msg.eventName)

        this.handlersOnce.delete(msg.eventName)
        let result = null
        if(handler) result = await handler(ev, ...msg.args)
        this.send("invokeResult", {
          idInvoke : msg.idInvoke,
          data : result
        })
      })
      
      
    })

    this.on("console", async(ev, data)=>{
      console.log(data)
    })
    
  }  

  send(channel : string, ...args : any[]) : void {
    window.electron.send(channel,...args)
  }


  invoke(channel : string, ...args : any[]) : Promise<any> {
    // return window.electron.invoke(channel,...args)
    return new Promise<any>((resolve, reject)=>{
      this.ngZone.run(()=>{
        window.electron?.invoke(channel,...args).then(resolve).catch(reject)
      })
    }) 
  }

  on(channel :string, listener : (event: any, ...args: any[]) => void) : void {
    let ngListener = (event:string, ...args : any[])=>{
      this.ngZone.run(()=>{listener(event,...args)})
    }
    window.electron?.on(channel,ngListener)
  }

  once(channel : string, listener : (event: any, ...args: any[]) => void) :void {
    let ngListener = (event:string, ...args : any[])=>{
      this.ngZone.run(()=>{listener(event,...args)})
    }
    window.electron?.once(channel,ngListener)
  }

  removeListener(channel : string, listener : (event: any, ...args: any[]) => void) :void {
   //TODO refactor because of the ngZone
    window.electron?.removeListener(channel,listener)
  }

  handle(channel : string, listener : (...args: any[]) => Promise<any>) :void {
    this.handlers.set(channel, listener)
  }

  handleOnce(channel : string, listener : (event: any, ...args: any[]) => Promise<any>) :void {
    this.handlersOnce.set(channel, listener)
  }
}
