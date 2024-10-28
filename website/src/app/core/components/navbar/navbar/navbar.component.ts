import { Component } from '@angular/core';
import { NavbarItemComponent } from '../navbar-item/navbar-item.component';
import { KeyValuePipe } from '@angular/common';
import { NavigationModuleID } from '../../../models/navigation/navigationModules';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NavbarItemComponent, KeyValuePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  modules = NavigationModuleID

  constructor(){
  }


  sortModules(a : any, b : any){
    return a.value.order - b.value.order
  }

}
