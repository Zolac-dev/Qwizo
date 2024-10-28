import { ipcMain } from "electron";
import { store } from "../../store.mjs";

ipcMain.handle("widgets:path",()=>{
    let base = `http://localhost:${store.store.server.port}/widgets/`

    return {
        question : base+ "question",
        scores : base + "scores?nb=5"
    }
})