import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { AddPractitioner } from "src/app/applicationModules/Models/AddPractitioner";
import {
  PractitionerModel,
  PractitionerDefaultInfoModel,
  PractitionerProfileUpdate,
} from "src/app/applicationModules/Models/practitionerViewModel";

@Injectable({
  providedIn: "root",
})
export class PractitionerService {
  public url = environment.apiUrl + "api/practitioner";

  constructor(public http: HttpClient) {}

  addPractitionerRecord(Model: AddPractitioner) {
    return this.http.post(this.url, Model).pipe();
  }
  getAllPractitionerList() {
    return this.http.get(this.url).pipe();
  }
  getPractitionerDetailById(id: string) {
    return this.http.get(this.url + "getByPractitionerId/" + id).pipe();
  }

  updatePractitionerRecord(model: PractitionerModel) {
    return this.http.patch(this.url, model).pipe();
  }

  // saveDefaultMsgLink(model: PractitionerDefaultInfoModel): Observable<any> {
  //   return this.http.post(this.url + "SaveDefaultMsgTemplate", model);
  // }

  getDefaultMsgTemplate(): Observable<any> {
    return this.http.get(this.url + "GetDefaultMsgTemplate");
  }

  getDefaultMsgTemplateBUserId(userId:string): Observable<any> {
    return this.http.get(this.url + "GetDefaultMsgTemplateBUserId/"+ userId);
  }

  getTemplate(templateType: string): Observable<any> {
    return this.http.get(this.url + "GetTemplate/" + templateType);
  }

  getPractitionerTemplate(templateType: string,lang:string): Observable<any> {
    let model={'templateName':templateType, 'lKey':lang};

    return this.http.post(this.url + "getPractitionerTemplate" , model);
  }

  getAddMeetingTemplateByUserId(templateType: string, userId:string): Observable<any> {
    return this.http.get(this.url + "GetAddMeetingTemplateByUserId/" + templateType+"/"+ userId);
  }

  
  deletePractitionerById(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  updateAddMeetingTemplate(
    model: PractitionerDefaultInfoModel
  ): Observable<any> {
    return this.http.patch(this.url + "UpdateAddMeetingTemplate", model);
  }

  isPractitionerActive(): Observable<any> {
    return this.http.get(this.url + "IsPractitionerActive");
  }
  getDefaultEmailLayout(): Observable<any> {
    return this.http.get(this.url + "GetDefaultEmailLayout");
  }

  getPractitionerDetails() : Observable<any> {
    return this.http.get(this.url + "getByLoggedinUser");
  }
  
  updateProfile(model: PractitionerProfileUpdate) :Observable<any> {
    return this.http.post(this.url + "UpdateProfile", model);
  }
}
