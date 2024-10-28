import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { ElectronService } from '../../../../core/services/electron.service';
import { KeyValuePipe } from '@angular/common';
import { TippyDirective } from '../../../../shared/directives/tippy.directive';

@Component({
  selector: 'app-widgets-card',
  standalone: true,
  imports: [FaIconComponent, KeyValuePipe,TippyDirective],
  templateUrl: './widgets-card.component.html',
  styleUrl: './widgets-card.component.scss'
})
export class WidgetsCardComponent {

  widgets : {[key : string]:string} = {}

  icons = {
    copy : faCopy
  }

  constructor(private electron : ElectronService){
    this.electron.invoke("widgets:path").then((values)=>{
      this.widgets = values
    })
  }

  copy(text : string){
    navigator.clipboard.writeText(text)
  }
}
