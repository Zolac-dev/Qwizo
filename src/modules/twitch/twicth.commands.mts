import { ipcMain } from "electron";
import twitch from "./twitch.mjs";
import windowManager from "../../window/windowManager.mjs";
import { mainWindow } from "../../window/createWindow.mjs";

ipcMain.on("twitch:connect",()=>{
    twitch.windowOpen()
    mainWindow?.send("console",twitch.getConnectionUrl())
})

ipcMain.handle("twitch:isconnected",()=>{
    return twitch.connected
})

twitch.on("connect",()=>{
    for(let window of windowManager.getAllIterable()){
        window.send("twitch:connect")
    }
})

twitch.on("disconnect",()=>{
    for(let window of windowManager.getAllIterable()){
        window.send("twitch:disconnect")
    }
})

twitch.on("chat:message",(msg)=>{
    for(let window of windowManager.getAllIterable()){
        window.send("twitch:message",msg)
    }
})