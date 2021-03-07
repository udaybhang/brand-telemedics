import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { clinicModel } from "src/app/applicationModules/Models/ClinicModel";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ClinicService {
  
  public url = environment.apiUrl + "api/clinic/";

  constructor(public http: HttpClient) {}

  addClinicRecord(Model: clinicModel) {
    return this.http.post(this.url, Model).pipe();
  }

  getAllClinicsList() {
    return this.http.get(this.url).pipe();
  }

  getClinicDetailById(id: string) {
    return this.http.get(this.url + id).pipe();
  }

  updateClinicRecord(model: clinicModel) {
    return this.http.patch(this.url, model).pipe();
  }

  getLogoPathByIdentifier(identifierid: string) {
    return this.http
      .get(this.url + "GetLogoByIdentifier/" + identifierid)
      .pipe();
  }
  
  getClinicByIdentifier(identifier: string): Observable<any> {
    return this.http.get<any>(this.url + "GetClinicByIdentifier/" + identifier);
  }

  deleteClinicById(id: string) :Observable<any> {
    return this.http.delete(this.url + id);
  }

  getMeetingChangesByIdentifier(identifier:string) :Observable<any> {
    return this.http.get<any>(this.url + "GetMeetingChangesByIdentifier/" + identifier);
  }

  getAdminClinicDetails(): Observable<any> {
    return this.http.get<any>(this.url + "GetAdminClinicDetails");
  }

  getClinicTemplate(templateType:string): Observable<any> {
    return this.http.get(this.url + "GetClinicTemplate/"+templateType);
  }
  getClinicOrMasterTemplate(templateName:string,clinicId:number,lKey:string): Observable<any> {

    let model={'clinicId':clinicId, 'templateName':templateName, 'lKey':lKey};
    return this.http.post<any>(this.url + "GetClinicOrMasterTemplate",model);
  
  }


  getEmailSMSTemplate(templateType:string,clinicId:number,lKey:string,isClincAdmin: any): Observable<any> {

  
    let model={'clinicId':clinicId, 'templateType':templateType, 'lKey':lKey,isClinicAdmin:isClincAdmin};
    return this.http.post<any>(this.url + "GetEmailSMSTemplateList",model);
  
  }


  updateClinicTemplate(templateType:string, templateValue:string,key:string): Observable<any> {
    return this.http.post(this.url + "UpdateClinicTemplate", {ClinicId:0,KeyName:templateType,KeyValue:templateValue,lang:key});
  }

  getClinicThemeByIdentifier(identifier:string): Observable<any> {
    return this.http.get(this.url + "GetClinicThemeByIdentifier/"+identifier);
  }

  getClinicPaymentTypes(identifier:string): Observable<any> {
    return this.http.get(this.url + "GetClinicPaymentTypes/"+identifier);
  }

  getTreatmentConsentText(identifier:string): Observable<any> {
    return this.http.get(this.url + "GetTreatmentConsentText/"+identifier);
  }

  getVisitReasonsByIdentifier(identifier:string): Observable<any> {
    return this.http.get(this.url + "GetVisitReasonsByIdentifier/"+identifier);
  }
  getCovidTestTypes(identifier:string):Observable<any> {
    return this.http.get<any>(this.url + "GetCovidTestTypes/"+identifier);
  }
  
  getCovidTestReasons(identifier:string):Observable<any> {
    return this.http.get<any>(this.url + "GetCovidTestReassons/"+identifier);
  }

  getCovidTestReasonsById(id:number):Observable<any> {
    return this.http.get<any>(this.url + "GetCovidTestReassonsById/"+id);
  }

  getMedicalSpecializationsById(id:number):Observable<any> {
    return this.http.get<any>(this.url + "GetMedicalSpecializationsById/"+id);
  }
  
  getMedicalSpecializationsByIdentifier(identifier:string):Observable<any> {
    return this.http.get<any>(this.url + "GetMedicalSpecializationsByIdentifier/"+identifier);
  }

  getMedicalSpecializationsByUser():Observable<any> {
    return this.http.get<any>(this.url + "GetMedicalSpecializationsByUser");
  }


  
}
