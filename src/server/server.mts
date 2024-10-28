import express, { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { glob } from "glob"
import { Route } from "./route.mjs";
import { Server as HttpServer } from "node:http"
import path from "path"
import { store, __dirname } from "../store.mjs";
import { Server as ServerIo, Socket } from "socket.io";
import { SocketHandler } from "./socket.mjs";
import { mainWindow } from "../window/createWindow.mjs";
import { getFilesWithPattern } from "../asar.mjs";


class Server{
	app : Express;
	server : HttpServer;
	io : ServerIo;

	private routes : Route[] = []

	constructor(){
		this.app = express()
		this.app.use(express.urlencoded({ extended: true }))
		this.app.use(express.json())
		this.app.use(cors({
			credentials : true,
			origin : ["*"]
		}))
		this.app.use(cookieParser())
		this.server = new HttpServer(this.app);
		
		// this.app.use(passport.initialize());
		this.io = new ServerIo(this.server, {
			cors : {
				origin : "*",
			},
			path : "/api/socket.io"
			
		})

		this.setupRoutes()
		this.setupSocketEvents()
	}

	private setupRoutes() : void{
		
		

		getFilesWithPattern("**/*.route.{js,mjs}").then(async (files)=>{
			this.routes = []
            for(let file of files){
                let module = await import("file://"+file)
                this.routes.push(module.default)
            }
            this.routes.sort((a : Route,b : Route)=>b.initializationPriority - a.initializationPriority)
            for (let module of this.routes){
				
				console.log("Load route : "+ module.constructor.name)
                module.configureRoutes()
                server.app.use(module.routerPath,module.router)
            }

			// this.app.use(twitch.middleware.bind(this) ,express.static(path.join(__dirname, '..','..', 'webpage', 'dist')))

        }).catch((err)=>{
            console.error(err)
        })
	}


	private setupSocketEvents(){
		getFilesWithPattern("**/*.socket.{js,mjs}").then(async (files)=>{
			let allModules : SocketHandler[] = []
			for(let file of files){
				let module = await import("file://"+file)
				allModules.push(module.default)
				console.log(`Load Socket Event : ${module.default.constructor.name}`)
			}

			this.io.on("connection", (socket : Socket)=>{
				for (let module of allModules){
					module.setupSocket(socket)
				}
			})

			
		})
	}


	start(port : number){
		this.server.listen(port, ()=>{
			console.log(`Server start at port : ${port}`)
		})

		
	}

	stop(){
		this.server.close()
	}
}


let server = new Server()
export default server
