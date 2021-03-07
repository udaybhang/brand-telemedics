import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { MultitenantModel } from "src/app/applicationModules/Models/multitenant-models/multitenant-model";

@Injectable()

export class SetTimoutSignalService {

  private startTimeout = new BehaviorSubject<boolean>(false);

  setStartTimeout(isStart: boolean) {
    this.startTimeout.next(isStart);
  }

  isStartTimeout(): Observable<boolean> {
    return this.startTimeout.asObservable();
  }
  

}
