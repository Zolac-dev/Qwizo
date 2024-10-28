import { Component } from '@angular/core';
import { WindowService } from '../../services/window.service';

@Component({
  selector: 'app-title-bar',
  standalone: true,
  imports: [],
  templateUrl: './title-bar.component.html',
  styleUrl: './title-bar.component.scss'
})
export class TitleBarComponent {
  maximized : boolean = false;

  constructor(public windowService : WindowService) { 
    // this.maximized = window.maximized;

    
  }

  

  ngOnInit(): void {
  }

  minimize(){
    this.windowService.minimize()
  }

  close(){
    this.windowService.close()
  }

  maximize(){
    this.windowService.maximize()
  }

  unmaximize(){
    this.windowService.unmaximize()
  }
}
