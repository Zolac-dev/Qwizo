import { BrowserWindow } from "electron";
import { ElectronWindow } from "./windows/base/electronWindow.mjs";

class WindowManager{

	private windows : Map<string, ElectronWindow> = new Map<string, ElectronWindow>()

	constructor(){
	}

	add(window : ElectronWindow){
		this.windows.set(window.uid, window)
	}

	remove(id : string) : boolean{
		return this.windows.delete(id)
	}	

	removeByWindow(window : ElectronWindow) : boolean{
		return this.windows.delete(window.uid)
	}	

	get(id : string) : ElectronWindow | undefined{
		return this.windows.get(id)
	}

	getAllIdIterable() : IterableIterator<string>{
		return this.windows.keys();
	}

	getAllId() : string[]{
		return Array.from(this.windows.keys())
	}

	getAllIterable() : IterableIterator<ElectronWindow>{
		return this.windows.values()
	}

	getByWebContentId(id : number){
		let result :ElectronWindow| undefined  = undefined
		for(let window of this.windows.values()){
			if(window.window.webContents.id == id){
				result = window
			}
		}
		return result
	}
}

export default new WindowManager();
