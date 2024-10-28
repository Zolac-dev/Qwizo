import { app, BrowserWindow, globalShortcut, ipcMain } from "electron";
import { createMainWindow, mainWindow } from "./window/createWindow.mjs";
import { glob } from "glob";
import server from "./server/server.mjs";
import { store, __dirname } from "./store.mjs";
import asar from "asar"
import path from "node:path";
import { minimatch } from "minimatch";
import { getFilesWithPattern } from "./asar.mjs";


store.onDidChange("server",()=>{
	server.stop()
    server.start(store.store.server.port)
})

app.on('ready', () => {
	createMainWindow();
	server.start(store.store.server.port)
	
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
		server.stop()
	}
});




app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createMainWindow();
	}
});


app.on("ready", ()=>{
	globalShortcut.register('Control+Shift+I', () => {
       BrowserWindow.getFocusedWindow()?.webContents.openDevTools();
	   return true;
    });

	globalShortcut.register('f5', function() {
		BrowserWindow.getFocusedWindow()?.reload()
	})
	globalShortcut.register('CommandOrControl+R', function() {
		BrowserWindow.getFocusedWindow()?.reload()
	})
})


getFilesWithPattern("**/*.commands.{mjs,js}").then((files)=>{	
	for(let file of files){
		import("file://"+file)
	}
})



