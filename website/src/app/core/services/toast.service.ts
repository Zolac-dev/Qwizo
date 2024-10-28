import { Injectable } from '@angular/core';
import { ToastModel, ToastType } from '../models/toast-type';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  onNew : Subject<ToastModel> = new Subject<ToastModel>()

  constructor() { }

  create(message : string, type : ToastType = ToastType.INFO, seconds : number = 3){
    this.onNew.next({ message : message, type : type, seconds : seconds})
  }
}
