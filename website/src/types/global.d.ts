export {};

declare global {
    interface Window { electron: Electron; }
}

interface Electron{
	send(channel : string, ...args : any[]) : void;
    invoke(channel : string, ...args : any[]) : Promise<any>;
    on(channel :string, listener : (event: any, ...args: any[]) => void) : void;
    once(channel : string, listener : (event: any, ...args: any[]) => void) : void;
    removeListener(channel : string, listener : (event: any, ...args: any[]) => void) : void;

}