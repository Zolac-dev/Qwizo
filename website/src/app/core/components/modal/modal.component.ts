import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() containerStyle : string = ''
  @ViewChild("modalContent") content !: ElementRef<HTMLElement>

  constructor(private modalService : ModalService, private renderer : Renderer2) {
    
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.modalService.notifyShow();
  }

  close(ev : any){
    this.modalService.close()
  }
}
