import { Injectable, OnDestroy } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { clinicModel } from "src/app/applicationModules/Models/ClinicModel";
import { AddMeetingModel } from "src/app/applicationModules/Models/meeting-models/add-meeting-model";
import { Observable } from "rxjs";
import {
  SaveMeetingInfoModel,
  MeetingModel,
} from "src/app/applicationModules/Models/meeting-models/meeting-model";

@Injectable({
  providedIn: "root",
})
export class MeetingService {
  public url = environment.apiUrl + "api/meeting/";
  public generalUrl = environment.apiUrl + "api/general/";

  constructor(public http: HttpClient) {}

  addMeeting(meeting: AddMeetingModel): Observable<any> {
    return this.http.post<any>(this.url, meeting);
  }

  addMeetingByClinicAdmin(meeting: AddMeetingModel): Observable<any> {
    return this.http.post<any>(this.url+"AddMeetingByClinicAdmin/", meeting);
  }

  updateMeeting(meeting: AddMeetingModel): Observable<any> {
    
    return this.http.patch<any>(this.url+'UpdatecMeetingInfo1', meeting);
  }

  startPatientMeeting(meetingId: string, isGuest:boolean): Observable<any> {

    if(isGuest)
      return this.http.get<any>(this.url + "startGuestMeeting/" + meetingId);

    return this.http.get<any>(this.url + "startmeetingPatient/" + meetingId);
  }

  startPractitionerMeeting(meetingId: string): Observable<any> {
    return this.http.get<any>(
      this.url + "startmeetingPractitioner/" + meetingId
    );
  }

  getMeetings(): Observable<any> {
    return this.http.get<any>(this.url + "GetMeetings");
  }

  getByMeetingId(id: string): Observable<any> {
    return this.http.get<any>(this.url + "GetByMeetingId/" + id);
  }


  sendSMS(meetingId: string,templateType:string): Observable<any> {
    let model={'meetingId':meetingId, 'templateType':templateType};
    return this.http.post<any>(this.url+"SendMeetingSms",model );
  }

  sendWhatsapp(meetingId: string,templateType:string): Observable<any> {
    let model={'meetingId':meetingId, 'templateType':templateType};
    return this.http.post<any>(this.url+"SendMeetingWhatsapp",model );
  }

  sendEmail(meetingId: string): Observable<any> {
    let model={'meetingId':meetingId};

    return this.http.post<any>(this.url + "SendMeetingEmail" ,model);
  }

  sendInvite(meetingId: string, emailId:string): Observable<any> {
    let model={'meetingId':meetingId,'emailId':emailId};

    return this.http.post<any>(this.url + "SendInviteEmail" ,model);
  }


  // saveLinkMessage(model: SaveMeetingInfoModel): Observable<any> {
  //   return this.http.post<any>(this.url + "SaveLiskMessage", model);
  // }

  saveMeetingSummary(model: MeetingModel): Observable<any> {
    debugger;
    return this.http.patch<any>(this.url + "UpdateMeetingSummary", model);
  }

  endMeeting(id: string): Observable<any> {
    return this.http.get<any>(this.url + "EndMeeting/" + id);
  }

  cancelMeeting(id: string): Observable<any> {
    return this.http.get<any>(this.url + "CancelMeeting/" + id);
  }
  // getIcdCodes(): Observable<any> {
  //   return this.http.get<any>(this.generalUrl + "GetICDCodes" );
  // }
  getIcdCodes(): Observable<any> {
    const Url = this.generalUrl + "GetICDCodes";
    return this.http.get(Url);
  }
  getCptCodes(): Observable<any> {
    return this.http.get<any>(this.generalUrl + "GetCPDCodes");
  }

  getMeetingIdByCode(code: string): Observable<any> {
    return this.http.get<any>(this.url + "GetMeetingIdByCode/" + code);
  }

  getZoomLinkByMeetingId(meetingId: string): Observable<any> {
    return this.http.get<any>(this.url + "GetZoomLinkByMeetingId/" + meetingId);
  }

  generateMeetingCode(meetingId: string): Observable<any> {
    return this.http.get<any>(this.url + "GenerateMeetingCode/" + meetingId);
  }

  patientLeftNotify(meetingId: string): Observable<any> {
    return this.http.get<any>(this.url + "PatientLeftNotify/" + meetingId);
  }

  notifyMeetingPatient(meetingId: string): Observable<any> {
    return this.http.get<any>(this.url + "notifyMeetingPatient/" + meetingId);
  }

  savePatientConsent(meetingId: string, value:boolean): Observable<any> {
    return this.http.post<any>(this.url + "savePatientConsent/" + meetingId,value);
  }

  setBillingStatus(meetingId: string, statusId:number): Observable<any> {
    return this.http.post<any>(this.url + "SetBillingStatus/" + meetingId,statusId);
  }

  getMeetingStatus():Observable<any>{
    return this.http.get<any>(this.url +"GetMeetingStatus");
  }
  
}
