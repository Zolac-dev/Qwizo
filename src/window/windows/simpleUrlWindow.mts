import { BrowserWindowConstructorOptions } from "electron";
import path from "path";
import { ElectronWindow } from "./base/electronWindow.mjs";

import { publicFolder} from "../../store.mjs";


class SimpleUrlWindow extends ElectronWindow{

	static OPTIONS_WINDOW : BrowserWindowConstructorOptions ={
		x: 100,
		y: 100,
		width: 400,
		height: 800,
		minWidth : 400,
		minHeight : 400,
		modal : true,

		icon : path.join(publicFolder, "/favicon.ico"),
		autoHideMenuBar : true,
	}


	constructor(private url : string){
		super(SimpleUrlWindow.OPTIONS_WINDOW)
		this.window.loadURL(this.url)

	}
	
}



export { SimpleUrlWindow };
