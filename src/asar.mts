import { app } from "electron"
import asar from "asar"
import { minimatch } from "minimatch"
import path from "node:path"
import { __dirname } from "./store.mjs"
import { glob } from "glob"

let asarFiles : string[] = []
if(app.isPackaged){
    asarFiles = asar.listPackage( __dirname  )
}

async function getFilesWithPattern(pattern : string){
    let files = []
    if(app.isPackaged){
        files = minimatch.match(asarFiles,pattern).map(x=>path.join(__dirname,x))
    }else{
        files = await glob.glob(pattern,{ absolute : true })
    }
    return files
}
export { getFilesWithPattern }