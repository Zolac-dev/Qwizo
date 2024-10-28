import { ipcRenderer, ipcMain, contextBridge, IpcRendererEvent } from "electron";



contextBridge.exposeInMainWorld("electron", {
    send(channel : string, ...args : any[]) {
        ipcRenderer.send(channel, ...args);
    },


    invoke(channel : string, ...args : any[]) {
        return ipcRenderer.invoke(channel, ...args);
        
    },

    on(channel :string, listener : (event: IpcRendererEvent, ...args: any[]) => void) {
        ipcRenderer.on(channel, listener);
        return this;
    },

    once(channel : string, listener : (event: IpcRendererEvent, ...args: any[]) => void) {
        ipcRenderer.once(channel, listener);
        return this;
    },

    removeListener(channel : string, listener : (event: IpcRendererEvent, ...args: any[]) => void) {
        ipcRenderer.removeListener(channel, listener);
        return this;
        
    },

  

});