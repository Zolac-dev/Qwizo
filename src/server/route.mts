import { Router } from "express";

abstract class Route{
	initializationPriority : number ;
	router : Router;
	routerPath : string;

	constructor(path : string, priority : number = 0){
		if(path.length > 0 && path[0] != "/") path = "/" + path
		this.routerPath = path
		this.initializationPriority = priority
		this.router = Router()
	}

	
	abstract configureRoutes() : void
}

abstract class ApiRoute extends Route{

	constructor(path : string, priority : number = 0){
		if(path.length > 0 && path[0] != "/") path = "/" + path
		super("/api" +path, priority)
	}

}
export {Route, ApiRoute}