import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';
import { ModalDirective } from '../../shared/directives/modal.directive';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  container !: ViewContainerRef
  currentModal ?: {
    directive : ModalDirective,
    component : ComponentRef<ModalComponent>
  } 

  constructor() { 
  }


  open(modal : ModalDirective){
    if(this.currentModal == undefined){
      let nodes = []
      nodes.push([modal.el.nativeElement as Node])
      // }else{
      //   let copy = modal.el.nativeElement.cloneNode(true)
      //   nodes.push(Array.from(copy.childNodes))
      // }
      // let node = modal.el.nativeElement as Node
      let component = this.container.createComponent(ModalComponent,{
        projectableNodes : nodes
      })
      component.instance.containerStyle = modal.containerStyle
      this.currentModal = {
        directive : modal,
        component : component
      }
    }
  }

  close(){
    
    this.currentModal?.component.destroy()
    this.currentModal?.directive.onHide.emit()
    this.currentModal = undefined
    
    
  }

  notifyShow(){
    this.currentModal?.directive.onDisplay.emit()
  }
}
