import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleBarComponent } from './core/components/title-bar/title-bar.component';
import { NavbarComponent } from './core/components/navbar/navbar/navbar.component';
import { ToastContainerComponent } from './core/components/toast/toast-container/toast-container.component';
import tippy from "tippy.js";
import { ModalService } from './core/services/modal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TitleBarComponent, NavbarComponent, ToastContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'website';
  @ViewChild("content", {read: ViewContainerRef}) containerMainPage!: ViewContainerRef;

  constructor(private modalService : ModalService){
    
  }

  ngAfterViewInit(): void {
    this.modalService.container = this.containerMainPage
  }
}
