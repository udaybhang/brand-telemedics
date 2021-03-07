import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { CommonService } from "src/app/Services/common/common.service";

@Injectable({
  providedIn: "root",
})
export class SuperAdmin_Admin_AuthGuard implements CanActivate {
  constructor(private common: CommonService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.common.isUserLoggedIn(1)) {
      if (next.data && next.data.roles) {
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
      }
      else {
        return true;
      }
    } else if (this.common.isUserLoggedIn(3)) {
      return true;
    } else {
      this.common.redirectLoggedinUser();
      return false;
    }
  }
}

