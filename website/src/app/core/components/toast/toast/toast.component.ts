import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { FaIconComponent, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ToastType, toastIcons } from '../../../models/toast-type';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [FaIconComponent,NgStyle],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {

  @Input() text : string = "";

  
  _type : ToastType = ToastType.INFO
  @Input() set type(value : ToastType ){
    this._type = value;
    switch(value){
      case ToastType.INFO:
        this.color = {
          background : "#7a9dd6",
          text : "white",
          icon : "#ffffff"
        }
        break;
      case ToastType.ERROR:
        this.color = {
          background : "#db6565",
          text : "white",
          icon : "#ffffff"
        }
        break;
      case ToastType.SUCCESS:
        this.color = {
          background : "#62c465",
          text : "white",
          icon : "#ffffff"
        }
        break;
      case ToastType.WARNING:
        this.color = {
          background : "#debb6a",
          text : "white",
          icon : "#ffffff"
        }
        break;
    }
    this.icon = toastIcons[value]
  }

  get type() : ToastType{
    return this._type;
  }

  @Output() onClose : EventEmitter<void> = new EventEmitter<void>()

  color : { background : string, text : string, icon : string} = {
    background : "#000000",
    text : "#ffffff",
    icon : "#AAAAAA"
  }

  icon : IconDefinition = toastIcons[ToastType.INFO]
  iconClose : IconDefinition =  faXmark;

  constructor(public element : ElementRef) { }

  ngOnInit(): void {
  }

  close(){
    this.onClose.emit()
  }

}
