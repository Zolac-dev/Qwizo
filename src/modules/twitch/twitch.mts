import { NextFunction, Request, Response } from "express"
import axios from "axios"
import {  WebSocket, RawData } from "ws"
import { EventEmitter } from "events"
import { store } from "../../store.mjs"
import { SimpleUrlWindow } from "../../window/windows/simpleUrlWindow.mjs"


class Twicth extends EventEmitter{
    
    token ?: string
    tokenRefresh ?: string
    socket ?: WebSocket

    _connected : boolean = false
    set connected(val : boolean){
        if(val == this._connected) return;
        this._connected = val;
        if(val){
            this.emit("connect")
        }else{
            this.emit("disconnect")
        }
    }

    get connected(){
        return this._connected;
    }

    constructor(){
        super()

    }


    promiseAsk ?: Promise<void>

    // middleware : any = this.connectMiddleware.bind(this) 
    // private connectMiddleware(req : Request, res : Response, next : NextFunction){
    //     if(this.token){
    //         next()
    //     }else{
    //         if(!this.code){
    //             res.redirect(this.getUrlToGetCode())
    //         }else{
    //             if(this.promiseAsk == undefined){
    //                 this.promiseAsk = this.auth()
    //             }

    //             this.promiseAsk!.then(()=>{this.promiseAsk = undefined;next()})

                
    //         }
    //     }
    // }

    private window : SimpleUrlWindow | null = null

    public  getConnectionUrl(){
        let params = new URLSearchParams({
            response_type : "code",
            scope : "user:bot user:read:chat user:write:chat",
            client_id : store.store.twitch.bot.id,
            redirect_uri : `http://localhost:${store.store.server.port}/twitch/auth`
        }).toString()
        let url = `https://id.twitch.tv/oauth2/authorize?${params}`
        return url
    }



    public windowOpen(){
        if(this.window != null || this.connected) return;
        this.window = new SimpleUrlWindow(this.getConnectionUrl())
        this.window.window.on("close",()=>{
            this.window = null;
        })
    }

    public windowClose(){
        if(this.window == null) return;
        this.window.destroy()
        this.window = null
    }

    
    public async auth(code : string){
        this.windowClose()
        if(this.connected) return;
        await this._auth(code);
    }

    private async _auth(code : string){       
        try{
            let resultToken =  await axios.post("https://id.twitch.tv/oauth2/token", {
                client_id : store.store.twitch.bot.id,
                client_secret : store.store.twitch.bot.secret,
                code : code,
                grant_type:"authorization_code",
                redirect_uri:"http://localhost:"+store.store.server.port
            })


            this.token = resultToken.data.access_token;
            this.tokenRefresh = resultToken.data.refresh_token;

            this.socket = this.createSocket()
        }catch(err : any){
            console.error(err.response.data)
        }
       
        
        

    }



    createSocket(){
        if(this.token == undefined) return undefined;
        let socket = new WebSocket("wss://eventsub.wss.twitch.tv/ws")
        socket.on("open",()=>{
            // console.log("Connected")
            this.emit("ws:open")
        })

        socket.on("message", this.onMessageSocket.bind(this) ) 

        socket.on("error",(err : any)=>{
            console.error(err)
        })

        socket.on("close",()=>{
            this.emit("ws:close")
        })

        return socket
    }

    private onMessageSocket(data : RawData){
        let message = JSON.parse(data.toString())
        switch(message.metadata.message_type){
            case "session_welcome":
                this.subscribe(message.payload.session.id).then((connected: boolean)=>{
                    this.connected = connected
                })
                break;
            case "notification":
                this.onNotificationTwicth(message)
                break;
        }

    }

    private onNotificationTwicth(message : any){
        switch(message.metadata.subscription_type){
            case "channel.chat.message":
                this.emit("chat:message",message.payload.event)
                break;
        }
    }

    private async subscribe(sessionId : string){
        try{
            let result = await axios.post("https://api.twitch.tv/helix/eventsub/subscriptions",{
                type : "channel.chat.message",
                version : "1",
                condition : {
                    broadcaster_user_id : store.store.twitch.broadcastId,
                    user_id : store.store.twitch.broadcastId
                },
                transport : {
                    method : "websocket",
                    session_id : sessionId
                }
            },{
                headers : {
                    "Client-ID" : store.store.twitch.bot.id,
                    "Authorization" : `Bearer ${this.token}`,
                    "Content-Type" : "application/json"
                }
            })
            return true
        }catch(err : any){
            console.error(err.response.data)
            return false
        }
        
    }
}




export default new Twicth()