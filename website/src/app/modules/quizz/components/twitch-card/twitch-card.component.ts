import { Component } from '@angular/core';
import { ElectronService } from '../../../../core/services/electron.service';
import { faTwitch } from '@fortawesome/free-brands-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TwitchService } from '../../../../core/services/twitch.service';

@Component({
  selector: 'app-twitch-card',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './twitch-card.component.html',
  styleUrl: './twitch-card.component.scss'
})
export class TwitchCardComponent {

  icons = {
    twitch : faTwitch
  }

  constructor(private twitch : TwitchService){

  }

  connect(){
    this.twitch.connect()
  }
}
