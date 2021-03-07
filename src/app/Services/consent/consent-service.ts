import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http"; 
import { Observable } from "rxjs"; 
import { ConsentModel } from "src/app/applicationModules/Models/consent-models/consent-model";
import { AddConsentModel } from "src/app/applicationModules/Models/consent-models/add-consent-model";

@Injectable({
  providedIn: "root",
})
export class ConsentService {
  public url = environment.apiUrl + "api/consent/";
  constructor(public http: HttpClient) {}

  addConsentRecord(Model: AddConsentModel) {
    return this.http.post<any>(this.url, Model).pipe();
  }

  getAllConsentList() {
    return this.http.get<any>(this.url);
  }

  getConsentDetailById(id) {
    return this.http.get(this.url +"GetConsentById/" +id).pipe();
  }  
  getConsentOrderCount(id,clinicIdentitifier:string) {
    return this.http.get(this.url +"GetConsentOrderCount/" +id+"/"+clinicIdentitifier).pipe();
  }
  updateConsentRecord(model: AddConsentModel) {
    return this.http.patch<any>(this.url, model).pipe();
  }
  getConsentDependency(id) {
    return this.http.get(this.url +"GetConsentDependency/" +id).pipe();
  }

  deleteConsentById(id) :Observable<any> {
    return this.http.delete(this.url + id);
  }
  
 
  getClinicCovidTestConsents(clinicIdentitifier:string): Observable<any> {
    return this.http.get<any>(this.url + "GetClinicCovidTestConsents/"+ clinicIdentitifier);
  }
  getClinicTeleVisitConsents(clinicIdentitifier:string): Observable<any> {
    return this.http.get<any>(this.url + "GetClinicTeleVisitConsents/"+ clinicIdentitifier);
  }
  
}
