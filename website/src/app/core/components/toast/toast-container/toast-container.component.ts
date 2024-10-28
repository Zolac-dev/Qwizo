import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ToastModel } from '../../../models/toast-type';
import { ToastService } from '../../../services/toast.service';
import { ToastComponent } from '../toast/toast.component';
import { animate, state, style, transition, trigger, AnimationBuilder, AnimationFactory } from '@angular/animations';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.scss'
})
export class ToastContainerComponent {
  @ViewChild("toastContainer" , { read : ViewContainerRef }) container !: ViewContainerRef; 
  animationShow : AnimationFactory;
  animationHide : AnimationFactory;


  constructor(private toastService : ToastService, private builder : AnimationBuilder) { 
    
    this.animationShow = this.builder.build([
      style({transform : 'translateX(100%)'}),
      animate('0.25s ease-out', style({ transform : 'translateX(0%)' }))
    ]);

    this.animationHide = this.builder.build([
      style({transform : 'translateX(0%)'}),
      animate('0.5s ease-out', style({ transform : 'translateX(100%)' }))
    ]);

    
    this.toastService.onNew.subscribe((toastInfo : ToastModel)=>{
      this.createToast(toastInfo)
    })
  }

  ngOnInit(): void {
  }

  private createToast(info : ToastModel){

    let component = this.container.createComponent(ToastComponent)
    component.setInput("text", info.message)
    component.setInput("type",info.type)
    let anim = this.animationShow.create(component.instance.element.nativeElement)
    anim.play()

    let functionClose = ()=>{
      clearTimeout(timeout)
      component.instance.onClose.unsubscribe()
      anim = this.animationHide.create(component.instance.element.nativeElement)
      anim.onDone(()=>{
        component.destroy()
      })
      anim.play()
    }

    let timeout = setTimeout(functionClose,info.seconds * 1000)
    component.instance.onClose.subscribe(functionClose)
    
  }
}
