import { BrowserWindow, BrowserWindowConstructorOptions, ipcMain } from "electron";
import { EventEmitter } from "events";
import { v4 as uuidv4 } from "uuid";
import windowManager from "../../windowManager.mjs";

class ElectronWindow{

	window : BrowserWindow;
	uid : string;

	constructor(options? : BrowserWindowConstructorOptions){
		this.window = new BrowserWindow(options)
		this.uid = uuidv4();
		this.createWindow();
		
		windowManager.add(this);

		this.window.webContents.on('did-finish-load', () => {
			this.send('window-id', this.uid);
		});

	}

	private handleInvoke : Map<string, (value: any) => void> = new Map<string, (value: any) => void>()

	protected createWindow(){

		this.window.center();
		
		this.on("invokeResult",(event, msg)=>{
			let resolve = this.handleInvoke.get(msg.idInvoke);
			if(resolve)
				resolve(msg.data)
		})

		this.window.on('close', () => {
			this.destroy()
		});

		this.on("window-close",(event)=>{
			this.window.close()
		})

		this.on("window-minimize",(event)=>{
			this.window.minimize()
		})

		this.on("window-maximize",(event)=>{
			this.window.maximize()
		})

		this.on("window-unmaximize",(event)=>{
			this.window.unmaximize()
		})
		


		for (let event of ['maximize', 'unmaximize', 'minimize', 'restore'] as any) {
			this.window.on(event, () => {
				this.send('windowSizeChange', {isMaximized: this.window.isMaximized()});
			});
		}


	}

	on(channel : string, listener: (event: Electron.IpcMainEvent, ...args: any[]) => void ){
		return this.window.webContents.ipc.on(channel,listener);
	}

	once(channel : string, listener: (event: Electron.IpcMainEvent, ...args: any[]) => void ){
		return this.window.webContents.ipc.once(channel,listener);
	}

	invoke(eventName : string, ...args: any[]) : Promise<any>{
		return new Promise((resolve,reject)=>{
			let message = {
				idInvoke : uuidv4(),
				eventName : eventName,
				args : args
			}
			this.handleInvoke.set(message.idInvoke,resolve)
			this.send("invoke", message)
		})	
	}

	send(eventName : string, ...args: any[] ){
		if (this.window && !this.window.isDestroyed()) {
			this.window.webContents.send(eventName, ...args);
		}
	}

	handle(channel : string, listener: (event: Electron.IpcMainInvokeEvent, ...args: any[])=> any){
		return this.window.webContents.ipc.handle(channel,listener)
	}

	handleOnce(channel : string, listener: (event: Electron.IpcMainInvokeEvent, ...args: any[])=> any){
		return this.window.webContents.ipc.handleOnce(channel,listener)
	}

	off(eventName: "audio-state-changed", listener: (...args: any[]) => void){
		return this.window.webContents.off(eventName, listener)
	}

	destroy(){
		windowManager.remove(this.uid)
		// this.rpc?.destroy()
		this.window.destroy()
	}


	

	
}

export { ElectronWindow }
