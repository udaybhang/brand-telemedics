import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  logoutUser() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    this.navigateToLogin();
  }
  user: any = {};
  constructor(private router: Router) { }
  navigateToError() {
    this.router.navigate(["404-not-found"]);
  }
  setIdentifier(identifier: string) {
    localStorage.setItem("Identifier", identifier); 
  }

  setCurrentUser(userdata: any, accessToken: string, refreshToken: string) {
    localStorage.setItem("currentUser", JSON.stringify(userdata));
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }

  redirectLoggedinUser() {
      const user = JSON.parse(localStorage.getItem("currentUser") || '{}');

      if (user.userType == 2) {
        this.router.navigate(["meeting/list/"]);
      } else if (user.userType == 1) {
        this.router.navigate(["clinic"]);
      }
      else if (user.userType == 3) {
        
        this.router.navigate(["practitioner"]);
      }
    else {
      this.navigateToLogin();
    }
  }
  navigateToLogin() {
   
    const cIdentifier = localStorage.getItem("Identifier");
    if (cIdentifier) {
      this.router.navigate([cIdentifier + "/login"])
      
    } else {
      this.router.navigate(["/admin"]);
    }
  }
  
}


