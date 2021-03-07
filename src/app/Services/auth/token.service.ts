import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { RefreshTokenModel } from "src/app/applicationModules/Models/LoginVM";
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: "root",
})
export class TokenService {
  
  public url = environment.apiUrl + "api/token/";

  constructor(public http: HttpClient) {}

  refreshToken(model:RefreshTokenModel) : Observable<any> {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });
    return this.http.post<any>(this.url+ "RefreshToken",model,{ headers: reqHeader });
  }

  // async refreshToken(userType = 0) 
  // : Promise<boolean> {

  //   var promise = new Promise<boolean>((resolve, reject) => {

  //     let isLoggedin = false;
  //     const userdata = localStorage.getItem("currentUser");
  //     const accessToken = localStorage.getItem("accessToken");
  //     const helper = new JwtHelperService();
      
  //     if (userdata && userdata !== "" && accessToken != null ) {
  //       if (userType != 0) {
  //         // user type 1 is Super Admin, 2 is Practitioner, 3 is Clinic Admin
  //         const user = JSON.parse(userdata);
  //         isLoggedin = user.userType == userType;
  //       }
  //       isLoggedin = true;
  //     } else {
  //       isLoggedin = false;
  //     }
  //     if(isLoggedin) {
  //       const isExpired = helper.isTokenExpired(accessToken);
  //       if(isExpired){
  //         const refreshTokenObj = new RefreshTokenModel();
  //         refreshTokenObj.accessToken=  localStorage.getItem("accessToken");
  //         refreshTokenObj.refreshToken = localStorage.getItem("refreshToken");
  //           this.refreshTokenHttp(refreshTokenObj).toPromise()
  //        .then(res => {
  //           if(res.isSuccess){
  //             localStorage.setItem("accessToken",res.data.accessToken);
  //             localStorage.setItem("refreshToken",res.data.refreshToken);
  //             return resolve(true);
  //           } else {
  //             return reject(false);
  //           }
           
  //         })
  //       } else {
  //         return resolve(true);
  //       }
  //     } else {
  //       return reject(false);
  //     }
  



  //   });
  //   return promise;
    
   
  // }
}
