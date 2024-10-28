import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Directive({
  selector: '[modal]',
  standalone: true
})
export class ModalDirective {

  @Input() containerStyle : string = ""
  @Output() onDisplay : EventEmitter<void> = new EventEmitter<void>()

  @Output() onHide : EventEmitter<void> = new EventEmitter<void>()
  // @Input() keepTag : boolean = true;

  constructor(public el: ElementRef<HTMLElement>) { 
    // this.el.nativeElement.style.display = "none"
    this.el.nativeElement.remove()
  }

}
