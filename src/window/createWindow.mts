import { AppWindow } from "./windows/windowApp.mjs";

var mainWindow : AppWindow | null = null

function createMainWindow(){
	if(mainWindow == null) {
		mainWindow = new AppWindow()
		mainWindow.window.on("close",(event)=>{
			mainWindow = null
		})
	}
	return mainWindow;
}


export { createMainWindow , mainWindow}
