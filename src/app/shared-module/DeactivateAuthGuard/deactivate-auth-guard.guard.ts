import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
    providedIn: 'root'
  })
  export class DeactivateAuthGuardGuard implements CanActivate {
    canActivate(   
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return true;
    }
  }
  
  export interface CanComponentDeactivate {
      canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
    }
    
    @Injectable()
    export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
      canDeactivate(component: CanComponentDeactivate, 
               route: ActivatedRouteSnapshot, 
               state: RouterStateSnapshot) {
     
         let url: string = state.url;
          return component.canDeactivate ? component.canDeactivate() : true;
                 
      }
      
    } 