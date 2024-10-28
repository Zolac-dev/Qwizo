import { ipcMain } from "electron"
import game from "../../models/game.mjs"
import windowManager from "../../window/windowManager.mjs"

game.on("question:update",(question)=>{
    for(let window of windowManager.getAllIterable()){
        window.send("question:update",question)
    }
    
})

game.on("user:update",(user)=>{
    for(let window of windowManager.getAllIterable()){
        window.send("user:update",user.info())
    }
    
})

game.on("user:new",(user)=>{
    for(let window of windowManager.getAllIterable()){
        window.send("user:new",user.info())
    }
    
})


ipcMain.on("question:update",(ev,newQuestion)=>{
    game.question = newQuestion
})

ipcMain.handle("question:current",()=>{
    return game.question
})

ipcMain.on("users:clear:validate",()=>{
    game.getUsers().forEach((user)=>user.setValidate(false))
})

ipcMain.on("users:clear:score",()=>{
    game.getUsers().forEach((user)=>user.setScore(0))
})

ipcMain.on("user:score",(ev,userId,pointToAdd)=>{
    game.getUser(userId)?.addScore(pointToAdd)
})

ipcMain.on("user:validate",(ev,userId)=>{
    game.getUser(userId)?.switchValidate()
})


ipcMain.handle("user:list",()=>{
    return game.getUsers().map(user=>user.info())
})

