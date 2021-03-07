import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SuperAdminUserModel } from "src/app/applicationModules/Models/adminUser-models";


@Injectable({
  providedIn: "root",
})
export class SuperAdminService {
  public url = environment.apiUrl + "api/admin/";

  constructor(public http: HttpClient) {}

  getSuperUsersList():Observable<any> {
    return this.http.get(this.url);
  }

  addSuperAdminUser(model: SuperAdminUserModel): Observable<any> {
    return this.http.post(this.url, model);
  }

  getAdminRoles() :Observable<any> {
    return this.http.get(this.url+"GetAdminRoles");
  }

  getAdminRolesByGroups():Observable<any> {
    return this.http.get(this.url+"GetAdminRolesByGroups");
  }

  getUserById(userId:string) :Observable<any> {
    return this.http.get(this.url + userId);
  }

  isUserInRole(role:string): Observable<any> {
    return this.http.get<any>(this.url + "isAdminInRole/"+role);
  }
  
  updateSuperAdminUser(model: SuperAdminUserModel): Observable<any> {
    return this.http.post(this.url + "updateAdminUser", model);
  }

  deleteSuperAdmin(userId:string) :  Observable<any> {
    return this.http.delete(this.url +userId);
  }

}
