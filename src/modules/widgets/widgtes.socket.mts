import { Socket } from "socket.io";
import { SocketHandler } from "../../server/socket.mjs";
import game from "../../models/game.mjs";


class WidgetsSocket implements SocketHandler{

    setupSocket(socket: Socket): void {
        socket.on("question:get",(callback)=>{
            callback(game.question)
        })

        socket.on("users:get",(callback)=>{
            callback(game.getUsers())
        })


        
    }
}

export default new WidgetsSocket()