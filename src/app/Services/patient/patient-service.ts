import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {
  PatientVerifyCodeModel,
  PatientDetailModel,
  AddPatientMeetingModel,
  PatientInfoModel,
  CheckFormProcessStatusModel,
} from "src/app/applicationModules/Models/patient-models/patient-model";
import { ConsentSignature, ScheduleCovidTestModel } from "src/app/applicationModules/Models/covid-test-models/covid-test-model";
import { ScheduleTeleVisitMeetingModel } from "src/app/applicationModules/Models/meeting-models/add-meeting-model";
import { SubmitPatientPaymentModel } from "src/app/applicationModules/Models/payment-models/payment-model";

@Injectable({
  providedIn: "root",
})
export class PatientService {
  public url = environment.apiUrl + "api/patient/";

  constructor(public http: HttpClient) {}

  patientVerify(model: PatientInfoModel): Observable<any> {
    return this.http.post(this.url + "PatientVerify/", model);
  }

  verifyRecapcha(model: PatientVerifyCodeModel): Observable<any> {
    return this.http.post(this.url + "VerifyRecapcha/", model);
  }

  patientVerifyCode(code: PatientVerifyCodeModel): Observable<any> {
    return this.http.post(this.url + "PatientVerifyCode", code);
  }
  addMeeting(meeting: AddPatientMeetingModel): Observable<any> {
    return this.http.post(this.url + "AddMeeting", meeting);
  }
  getMeetingConfirmation(meetingId: string): Observable<any> {
    return this.http.get<any>(this.url + "GetMeetingConfirmation/" + meetingId);
  }
  cancelMeeting(id: string): Observable<any> {
    return this.http.get<any>(this.url + "CancelMeeting/" + id);
  }
  // getAllPractitioners(identifier: string): Observable<any> {
  //   return this.http.get<any>(this.url + "GetAllPractitioners/" + identifier);
  // }

  getAvailableSpecialities(identifier: string): Observable<any> {
    return this.http.get<any>(this.url + "GetAvailableSpecialities/" + identifier);
  }

  checkPatientProcessStatus(model:CheckFormProcessStatusModel): Observable<any> {
    return this.http.post<any>(this.url + "CheckPatientProcessStatus/", model);
  }

  saveConsents(collectionId:string, modelList:ConsentSignature[]): Observable<any>  {
    return this.http.post<any> (this.url +"SaveConsents/"+ collectionId ,modelList)
   }

  scheduleCovidTestBooking(model:ScheduleCovidTestModel): Observable<any>  {
    return this.http.post<any> (this.url +"ScheduleCovidTestBooking/",model)
   }

   
   scheduleTeleVisitBooking(model:ScheduleTeleVisitMeetingModel): Observable<any>  {
    return this.http.post<any> (this.url +"scheduleTeleVisitBooking/",model)
   }

  setConsentFieldStatus(collectionId:string): Observable<any>  {
    return this.http.get<any> (this.url +"SetConsentFieldStatus/"+collectionId )
   }

   getCovidTestReasonId(collectionId:string): Observable<any>  {
    return this.http.get<any>(this.url + "getCovidTestReasonId/" + collectionId);
   }

   getPatientPaymentType(collectionId:string): Observable<any>  {
    return this.http.get<any>(this.url + "GetPatientPaymentType/" + collectionId);
   }

   getCovidTestTypeId(collectionId:string): Observable<any>  {
    return this.http.get<any>(this.url + "GetCovidTestTypeId/" + collectionId);
   }

   submitPatientPayment(model:SubmitPatientPaymentModel): Observable<any>  {
    return this.http.post<any> (this.url +"SubmitPatientPayment/",model)
   }

   

}
