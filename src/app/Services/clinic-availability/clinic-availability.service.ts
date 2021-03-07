import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ClinicAvailabilityDelRequestModel, ClinicAvailabiltyeModel, GetClinicAvailabilityReqModel } from "src/app/applicationModules/Models/clinic-admin-models/clinic-admin-model";
import { AvailableTimeSlotReqModal } from "src/app/applicationModules/Models/PractitionerSchedule";


@Injectable({
  providedIn: "root",
})
export class ClinicAvailabilityService {

    public url = environment.apiUrl + "api/clinicavailability/";

  constructor(public http: HttpClient) {}

  addAvailability(model:ClinicAvailabiltyeModel): Observable<any> {
    return this.http.post(this.url,model);
  }
  getAvailability(model: GetClinicAvailabilityReqModel): Observable<any> {
    return this.http.post(this.url+"GetAll", model);
  }

  getAvailableDates(clinicIdentifier:string): Observable<any> {
    return this.http.get(this.url+"GetAvailableDates/"+clinicIdentifier);
  }

  getTimeSlots(model: AvailableTimeSlotReqModal): Observable<any> {
    return this.http.post(this.url+"GetTimeSlots", model);
  }

  cancelAvailability(id:number): Observable<any> {
    return this.http.delete(this.url+id);
  }
  // cancelSeries(model: ClinicAvailabilityDelRequestModel): Observable<any> {
  //   return this.http.post(this.url+"GetAll", model);
  // }  
}
