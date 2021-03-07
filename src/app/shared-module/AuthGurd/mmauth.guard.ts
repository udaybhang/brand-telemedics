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
export class MMAuthGuard implements CanActivate {
  constructor(private common: CommonService, private _router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.common.isUserLoggedIn()) {
      return true;
    } else {
      this.common.redirectLoggedinUser();
      return false;
    }
    //return true;
  }
}
