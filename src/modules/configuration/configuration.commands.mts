import { ipcMain } from "electron";
import { store } from "../../store.mjs";

ipcMain.handle("configuration:get",(ev)=>{
    return store.store 
})


ipcMain.handle("configuration:update",(ev,data)=>{
    store.set(data)
    return true;
})