import { Component, EventEmitter, Output } from '@angular/core';
import { faCheck, faXmark, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../../../core/models/user';
import { ElectronService } from '../../../../core/services/electron.service';
import { NgClass } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [FaIconComponent, NgClass],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss'
})
export class UsersTableComponent {
  icons : any = {
    validate : faCheck,
    unvalidate : faXmark,
    plus: faPlus,
    minus : faMinus
  }

  @Output() onClickUser = new EventEmitter<User>()

  users : { [key : string] : User } = {}

  constructor(private electron : ElectronService){
    this.electron.invoke("user:list").then((users : User[])=>{
      users.forEach(user=>{
        this.users[user.id] = user
      })
    })

    this.electron.on("user:new",(ev,user : User)=>{
        this.users[user.id] = user
    })

    this.electron.on("user:update",(ev,user : User)=>{
        Object.assign(this.users[user.id],user)

    })
  }

  get listUsers(){
    return Object.values(this.users)
  }

  addScore(userId : string, score : number){
    this.electron.send("user:score",userId,score)
  }

  switchValidate(userId : string){
    this.electron.send("user:validate",userId)
  }

  resetScore(){
    this.electron.send("users:clear:score")
  }

  resetValidate(){
    this.electron.send("users:clear:validate")
  }

  clickUser(user : User){
    this.onClickUser.emit(user)
  }
}
