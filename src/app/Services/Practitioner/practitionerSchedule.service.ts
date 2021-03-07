import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import {
  PractitionerScheduleModel,
  AvailableTimeSlotReqModal,
  PractitionerScheduleDeleteRequestModel,
  AvailableDatesReqModal
} from "src/app/applicationModules/Models/PractitionerSchedule";

@Injectable({
  providedIn: "root",
})
export class PractitionerScheduleService {
  public url = environment.apiUrl + "api/PractitionerSchedule/";

  constructor(public http: HttpClient) {}

  addPractitionerScheduleRecord(Model: PractitionerScheduleModel) {
    return this.http.post(this.url, Model).pipe();
  }
  
  // getPractitionerScheduleDetailById(id) {
  //   return this.http.get(this.url + "getByPractitionerId/" + id).pipe();
  // }

  getAllAvailableTimeSlot(model: AvailableTimeSlotReqModal): Observable<any> {
    return this.http.post(this.url + "getAllAvailableTimeSlot", model);
  }


  getAvailableTimeSlotByPractitioner(model: AvailableTimeSlotReqModal): Observable<any> {
    return this.http.post(this.url + "getAvailableTimeSlotByPractitioner", model);
  }

  
  getEvents(info,userId):Observable<any>
  {

    return   this.http.post(this.url + "getPractitionerScheduleList",{ "StartDate": info.start ,"EndDate": info.end, "UserId":userId });
   
  }

 getBookingByPractitionerId(info,paymentType:string,practitionerUserId:string):Observable<any>
  {

   return this.http.post(this.url + "getBookingByPractitionerId",{ "StartDate": info.start ,"EndDate": info.end, "PaymentType":paymentType, "UserId":practitionerUserId });
   
  }


  cancelSlot(Model: PractitionerScheduleDeleteRequestModel) {
    
    return this.http.post(this.url+ "deletePractitionerSchedule", Model).pipe();
  }

  cancelSeries(Model: PractitionerScheduleDeleteRequestModel) {
    return this.http.post(this.url+ "deleteMeetingSchedule", Model).pipe();
  }
  getAvailableDates(model:AvailableDatesReqModal): Observable<any> {
    return this.http.post(this.url + "GetAvailableDates",model);
  }

  getAvailableTimeSlotForCovidTest(model: AvailableTimeSlotReqModal): Observable<any> {
    return this.http.post(this.url + "getAvailableTimeSlotForCovidTest", model);
  }


}
