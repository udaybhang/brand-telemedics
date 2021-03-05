import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { AuthUtil } from "../utility/auth-util";
import {isPlatformBrowser} from '@angular/common';

@Injectable()
export class AnonGaurd implements CanActivate {
  constructor(private router: Router,
              @Inject(PLATFORM_ID) private platformId: any) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        const curUser = JSON.parse(localStorage.getItem("currentUser") || '{}');
    const isNotLoggedIn = isPlatformBrowser(this.platformId) ? !AuthUtil.getAuthToken() : true;
    if (isNotLoggedIn) {
      return true;
    } else {
        if (curUser.userType == 2) {
            this.router.navigate(["meeting/list/"]);
          } else if (curUser.userType == 1) {
            this.router.navigate(["clinic"]);
          }
          else if (curUser.userType == 3) {
            
            this.router.navigate(["practitioner"]);
          }
    }
  }

}
