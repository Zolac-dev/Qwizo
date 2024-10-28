import { Route } from "../../server/route.mjs"
import twitch from "./twitch.mjs"

class TwitchRoute extends Route{
    constructor(){
        super("twitch")
    }

    configureRoutes() : void{
        this.router.get("/auth",(req,res)=>{
            if( !req.query["code"]) res.send("Nothing")
            else{
                twitch.auth(req.query["code"].toString())
                res.send("Connection done. Please wait....")
            }
        })

        

    }
    
}



export default new TwitchRoute()