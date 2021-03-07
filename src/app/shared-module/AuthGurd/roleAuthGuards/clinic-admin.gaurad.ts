import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { CommonService } from "src/app/Services/common/common.service";

@Injectable({
  providedIn: "root",
})
export class ClinicAdmin_AuthGuard implements CanActivate {
  constructor(private common: CommonService, private _router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.common.isUserLoggedIn(3)) {

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

     // return true;
    } else {
      this.common.redirectLoggedinUser();
      return false;
    }
  }
}
