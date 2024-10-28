import Store from 'electron-store';
import path from "node:path"
import { fileURLToPath } from 'node:url';

const schema = {
    production : { type : "boolean"},
    server : {
        port : { type : "integer"},
    },
    twitch : {
        broadcastId : { type : "string" },
        bot : {
            id : { type : "string"},
            secret : { type : "string"}
        }
    },
    users : {
        messages : {
            max : { type : "number"}
        }
    }
}

const store = new Store({ 
    name : "quizzTwitchConfig",
    defaults : {
        production : true,
        server : {
            port : 3000
        },
        users : {
            messages: {
                max: 5
            }
        },
        twitch : {
            broadcastId : "",
            bot : {
                id : "",
                secret : ""
            }
        }
} });

const publicFolder = path.join(store.store.production?".":"..") + "/public"
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory



export { store, publicFolder,__dirname }
