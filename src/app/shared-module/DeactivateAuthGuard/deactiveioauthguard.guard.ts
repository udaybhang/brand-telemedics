import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class DeactiveioauthguardGuard implements CanActivate {
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