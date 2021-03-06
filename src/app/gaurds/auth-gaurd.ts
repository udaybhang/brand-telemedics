import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthUtil} from '../utility/auth-util';
import {isPlatformBrowser} from '@angular/common';

@Injectable()
// {providedIn: 'root'}
export class AuthGaurd implements CanActivate {
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: any) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
      console.log(route, state);
    const isLoggedIn = isPlatformBrowser(this.platformId) ? !!AuthUtil.getAuthToken() : null;
    console.log('isLoggedIn==', isLoggedIn);
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['']);
    }
  }
}
