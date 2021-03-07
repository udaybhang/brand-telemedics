import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute,
} from "@angular/router";
import { Observable } from "rxjs";
import { CommonService } from "src/app/Services/common/common.service";


@Injectable({
  providedIn: "root",
})
export class SuperAdminAuthGuard implements CanActivate {
  constructor(private common: CommonService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
 
      // return this.common.isUserLoggedInNotExpired(1);
    if (this.common.isUserLoggedIn(1)) {
      if(next.data && next.data.roles){
        let result = false;
        const requiredRoles = next.data.roles as Array<string>;
        const userRoles = this.common.getRoles();
        requiredRoles.forEach(element => {
          if(userRoles.includes(element)){
            result = true;
          }
        });
        if(!result){
          this.common.redirectLoggedinUser();
        }
        return result;
      } else {
        return true;
      }    
     
    } else {
      this.common.redirectLoggedinUser();
      return false;
    }
  }
}
