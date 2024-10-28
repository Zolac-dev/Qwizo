import { Component, Input } from '@angular/core';
import { FaIconComponent, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { NavigationModuleID } from '../../../models/navigation/navigationModules';
import { NavigationService } from '../../../services/navigation.service';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { TippyDirective } from '../../../../shared/directives/tippy.directive';


@Component({
  selector: 'app-navbar-item',
  standalone: true,
  imports: [FaIconComponent, RouterLink,NgClass, TippyDirective],
  templateUrl: './navbar-item.component.html',
  styleUrl: './navbar-item.component.scss'
})
export class NavbarItemComponent {
  icon : IconDefinition = faCircleExclamation
  name : string = ""
  url : string = "/"
  active : boolean = false

  private _module !: NavigationModuleID;
  get module() : NavigationModuleID{
    return this._module;
  }
  @Input() set module( val : NavigationModuleID){
    if(this._module != val){
      let m = this.navigationService.getModule(val);
      if(m){
        this._module = val;
        this.name = m.name
        this.url = m.url
        this.icon = m.icon
        this.active = m.active
      }
    }
  }

  constructor(private navigationService : NavigationService){
    this.navigationService.onModuleActiveChange.subscribe((idModuleActive ?: NavigationModuleID)=>{
      this.active = this.module == idModuleActive
    })
  }

}
