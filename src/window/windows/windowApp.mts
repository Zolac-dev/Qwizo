import { BrowserWindow, BrowserWindowConstructorOptions } from "electron";
// import { production } from "../configuration.json"
import path from "path";
import { ElectronWindow } from "./base/electronWindow.mjs";
import url from "url"
import { app } from "electron"
import { publicFolder, store, __dirname } from "../../store.mjs";
import chokidar from "chokidar"


class AppWindow extends ElectronWindow{

	static OPTIONS_WINDOW : BrowserWindowConstructorOptions ={
		x: 10,
		y: 10,
		width: 1200,
		height: 800,
		minWidth : 600,
		minHeight : 400,

        icon :  path.join(publicFolder, "/favicon.ico"),
        
		frame : false,

        titleBarStyle: 'hiddenInset',


		webPreferences: {
			preload :  path.join(__dirname,"./window/windows/base/preload.js"),
			webSecurity : false,
		},
	}

	constructor(){
		super(AppWindow.OPTIONS_WINDOW)
	}
	
	protected createWindow(){

		super.createWindow()		
		this.window.removeMenu()
		this.window.setMenuBarVisibility(false);
        // this.window.loadURL(`http://localhost:${appConfig.server.port}`)
		
		if (store.get("production")) {
			this.window.loadURL(url.format({ pathname: path.join(__dirname, publicFolder, 'index.html'), protocol: 'file:', slashes: true }))
		} else {
			this.window.loadURL(url.format({ pathname: path.join(__dirname,"../website/dist", 'index.html'), protocol: 'file:', slashes: true }))
			chokidar.watch(path.join(__dirname,"../website/dist/")).on("change",(e)=>{
				setTimeout(()=>{
					this.window.reload()
				},250) 
			})
		}
	}
}



export { AppWindow };
