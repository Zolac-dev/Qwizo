import twitch from "../modules/twitch/twitch.mjs";
import { User } from "./user.mjs"
import { EventEmitter} from "events"

export class Game extends EventEmitter{

    users : { [key : string]: User} = {}
    private _question : string = ""

    set question(value : string){
        if(value == this._question) return;
        this._question = value
        this.emit("question:update",value)
    }

    get question(){
        return this._question
    }

    constructor(){
        super()
        twitch.on("chat:message",this.onMessageTwitch.bind(this))



        // for(let i = 1; i< 100; i++){
        //     this.createUser(i.toString(), Math.random().toString(36).substring(3,14))
        // }
    }

    onMessageTwitch(event : any){
        let user = this.users[event.chatter_user_id]
        if( user == undefined ){
            user = this.createUser(event.chatter_user_id,event.chatter_user_name) 
        }
        user.addMessage(event.message.text)
    }

    private addUser(user : User){
        this.users[user.id] = user
        user.on("update",(u)=>{
            this.emit("user:update",u)
        })
        this.emit("user:new", user)
    }

    private createUser(id : string, name  : string){
        let user = new User(id, name)
        this.addUser(user)
        return user
    }

    getUser(id : string){
        return this.users[id]
    }

    getUsers(){
        return Object.values(this.users)
    }
}



export default new Game()