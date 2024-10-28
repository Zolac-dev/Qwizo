import { Component } from '@angular/core';
import { UsersTableComponent } from "../../components/users-table/users-table.component";
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { QuestionCardComponent } from '../../components/question-card/question-card.component';
import { User } from '../../../../core/models/user';
import { TwitchCardComponent } from '../../components/twitch-card/twitch-card.component';
import { TwitchService } from '../../../../core/services/twitch.service';
import { WidgetsCardComponent } from "../../components/widgets-card/widgets-card.component";

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [UsersTableComponent, UserCardComponent, QuestionCardComponent, TwitchCardComponent, WidgetsCardComponent],
  templateUrl: './quizz.page.html',
  styleUrl: './quizz.page.scss'
})
export class QuizzPage {
  userSelected ?: User

  get twitchConnected(){
    return this.twitch.connected;
  }

  constructor(public twitch : TwitchService){
    
  }

  selectUser(user : User){
    this.userSelected = user
  }
}
