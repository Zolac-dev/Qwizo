import { EventEmitter} from "events"
import { store } from "../store.mjs"


export class User extends EventEmitter{

    id : string
    name : string
    score : number = 0 
    messages : { message : string, date : Date}[] = []
    validate : boolean = false


    constructor(id : string, name : string){
        super()
        this.id = id
        this.name = name
    }

    addMessage(message : string){
        this.messages.unshift({ message : message, date : new Date() } )
        let nbMessageMax = store.store?.users?.messages?.max??5
        if(this.messages.length > nbMessageMax ) this.messages.splice( nbMessageMax )
        this.emit("update",this)
    }

    addScore(nb : number){
        this.score += nb
        this.emit("update",this)
    }

    setScore(nb : number){
        this.score = nb
        this.emit("update",this)
    }

    switchValidate(){
        this.validate = !this.validate
        this.emit("update",this)
    }

    setValidate(valid : boolean){
        this.validate = valid
        this.emit("update",this)
    }

    info() : UserInfo{
        return {
            id : this.id,
            name : this.name,
            score : this.score,
            messages : this.messages,
            validate : this.validate

        }
    }

}

interface UserInfo{
    id : string
    name : string
    score : number 
    messages : { message : string, date : Date}[] 
    validate : boolean
}