import { Component, Input } from '@angular/core';
import { ElectronService } from '../../../../core/services/electron.service';
import { faCheck, faMinus, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../../../core/models/user';
import { DatePipe, NgClass } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [FaIconComponent, NgClass, DatePipe],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() user!: User;

  icons : any = {
    validate : faCheck,
    unvalidate : faXmark,
    plus: faPlus,
    minus : faMinus
  }

  constructor(private electron : ElectronService){}

  addScore(userId : string, score : number){
    this.electron.send("user:score",userId,score)
  }

  switchValidate(userId : string){
    this.electron.send("user:validate",userId)
  }
}
