import game from "../../models/game.mjs";
import { Route } from "../../server/route.mjs";
import server from "../../server/server.mjs";
import path from "node:path"
import { publicFolder,__dirname } from "../../store.mjs";

class WidgetsRoute extends Route{


    constructor(){
        super("widgets")

        game.on("question:update",(question)=>{
            server.io.emit("question:update",question)
        })

        game.on("user:new",(user)=>{
            server.io.emit("user:new",user)
        })

        game.on("user:update",(user)=>{
            server.io.emit("user:update",user)
        })
    }

    configureRoutes(): void {
        this.router.get("/question",(req,res)=>{res.sendFile(path.join(publicFolder,"widgets/question.html"), { root : __dirname})})
        this.router.get("/scores",(req,res)=>{res.sendFile(path.join(publicFolder,"widgets/scores.html"), { root : __dirname})})
    }
}


export default new WidgetsRoute()