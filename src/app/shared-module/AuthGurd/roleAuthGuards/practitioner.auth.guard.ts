import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { CommonService } from "src/app/Services/common/common.service";
import { globalConstanst } from "../../global-constants/global-constants";

@Injectable({
  providedIn: "root",
})
export class PractitionerAuthGuard implements CanActivate {
  constructor(private common: CommonService, private _router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.common.isUserLoggedIn(2)) {
      return true;
    } else {
      this.common.redirectLoggedinUser();
      return false;
    }
  }
}
