import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { MultitenantModel } from "src/app/applicationModules/Models/multitenant-models/multitenant-model";

@Injectable({
  providedIn: "root",
})

export class DataExchangeService {
  private clinicIdentifier = new BehaviorSubject<string>("");
  private superAdminDetails = new BehaviorSubject<MultitenantModel>(null as any);
  private startTimeout = new BehaviorSubject<boolean>(false);
  
  updateClinicIdentifier(nonce: string) {
    this.clinicIdentifier.next(nonce);
  }

  clearClinicIdentifier() {
    this.clinicIdentifier.unsubscribe();
  }

  getClinicIdentifier(): Observable<string> {
    return this.clinicIdentifier.asObservable();
  }

  setStartTimeout(isStart: boolean) {
    this.startTimeout.next(isStart);
  }


  isStartTimeout(): Observable<boolean> {
    return this.startTimeout.asObservable();
  }


  setAdminDetails(details: MultitenantModel) {
    console.log("seeting =", details);
    this.superAdminDetails.next(details);
    
  }

  getAdminDetails(): Observable<MultitenantModel> {
    console.log("getting =");
    return this.superAdminDetails.asObservable();

  }
  

}
