import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NavigationModuleID, navigationModules, NavigationModule } from '../models/navigation/navigationModules';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  onModuleActiveChange : BehaviorSubject<NavigationModuleID | undefined> =  new BehaviorSubject<NavigationModuleID | undefined>(undefined);

  private _activeModule ?: NavigationModuleID
  set activeModule(val : NavigationModuleID | undefined){ 
    if(val != this._activeModule){
      this._activeModule = val
      this.onModuleActiveChange.next(val);
    }
  }

  get activeModule() : NavigationModuleID | undefined{
    return this._activeModule
  }

  constructor(private router : Router) { 

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let possibleModules : any[]  = []
        Object.entries(navigationModules).forEach((val)=>{
          if(event.urlAfterRedirects.startsWith("/"+val[1].url)){
            possibleModules.push(val)
          }
        })

        if(possibleModules.length == 0){
          this.activeModule = undefined;
        }else{
          possibleModules.sort((a : any, b : any)=>{
            return b[1].order - a[1].order
          })
          this.activeModule = possibleModules[0][0]
        }
      }
      
    });
  }


  getModule(val : NavigationModuleID ) : NavigationModule & { active : boolean } | undefined{
    if( !(val in navigationModules)) return undefined
    return Object.assign({}, navigationModules[val], { active : this.activeModule == val})
  }

}
