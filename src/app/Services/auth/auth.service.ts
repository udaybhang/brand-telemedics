import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { LoginVM } from "src/app/applicationModules/Models/LoginVM";
import { Observable } from "rxjs";
import { UserModel } from "src/app/applicationModules/Models/practitionerViewModel";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private base_Url = environment.apiUrl;

  private accountApi = "api/account/";
  constructor(public http: HttpClient) {}

  register(Model: any) {
    const Url = this.base_Url + this.accountApi + `Register`;
    return this.http.post(Url, Model).pipe();
  }

  addUserForCompany(Model: any) {
    const Url = this.base_Url + this.accountApi + `AddUserForCompany`;
    return this.http.post(Url, Model).pipe();
  }

  // public token: string;
  login(Model: LoginVM) {
    const Url = this.base_Url + this.accountApi + "Login";
    return this.http.post(Url, Model).pipe();
  }

  CheckValidUserResetPassword(Model: any) {
    const Url = this.base_Url + this.accountApi + "CheckValidUserResetPassword";
    return this.http.post(Url, Model).pipe();
  }

  ResetPassword(Model: any) {
    const Url = this.base_Url + this.accountApi + "ResetPassword";
    return this.http.post(Url, Model).pipe();
  }
  RefreshToken(Model: any) {
    const Url = this.base_Url + this.accountApi + "RefreshToken";
    return this.http.post(Url, Model).pipe();
  }

  forgotPasswordLink(Model : LoginVM) {
    const Url = this.base_Url + this.accountApi + "ForgotPasswordLink";
    return this.http.post(Url, Model).pipe();
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.base_Url + this.accountApi  + "GetClinicAdmins");
  }

  
  getClinicAdminListByUser(): Observable<any> {
    return this.http.get<any>(this.base_Url + this.accountApi  + "GetClinicAdminListByUser");
  }


  addUsers(Model : UserModel): Observable<any> {
    return this.http.post<any>(this.base_Url + this.accountApi  + "AddClinicAdmin",Model);
  }


  deleteAdminUser(userId:string): Observable<any> {
    return this.http.delete<any>(this.base_Url + this.accountApi  + "DeleteClinicAdmin/"+userId,);
  }

  getClinicAdminByUserId(userId:string): Observable<any> {
    return this.http.get<any>(this.base_Url + this.accountApi  + "GetClinicAdminByUserId/"+userId);
  }

  getClinicUserByUserId(userId:string): Observable<any> {
    return this.http.get<any>(this.base_Url + this.accountApi  + "GetClinicAdmin/"+userId);
  }


  updateClinicAdminUser(Model : UserModel): Observable<any> {
    return this.http.post<any>(this.base_Url + this.accountApi  + "UpdateClinicAdmin",Model);
  }

isUserInRole(role:string): Observable<any> {
  return this.http.get<any>(this.base_Url + this.accountApi  + "isUserInRole/"+role);
}

getUserRoles(): Observable<any> {
  return this.http.get<any>(this.base_Url + this.accountApi  + "GetUserRoles");
}

getLoggedInUser(): Observable<any> {
  return this.http.get<any>(this.base_Url + this.accountApi  + "GetLoggedInUser");
}

}