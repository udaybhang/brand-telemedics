import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CommonService } from "../common/common.service";

@Injectable({
  providedIn: "root",
})
export class AuthorizationRoleService implements CanActivate {
  private currentUserSubject: any;
  public currentUser: any;

  constructor(private http: HttpClient, private commonService: CommonService) {
    this.currentUserSubject = this.commonService.getCurrentUser();
    this.currentUser = this.currentUserSubject.asObservable();
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.commonService.getCurrentUser().decode();
    if (user.Role === next.data.role) {
      return true;
    }
    return false;
  }
}
