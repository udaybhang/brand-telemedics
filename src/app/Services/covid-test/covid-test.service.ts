import { Injectable, OnDestroy } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AddCovidTestModel } from "src/app/applicationModules/Models/covid-test-models/covid-test-model";
import { PDFGenerateModel } from "src/app/applicationModules/Models/general-data-models/pdf-generate-model";
import { UpdateCovidTestVM } from "src/app/applicationModules/Models/covid/covid-test-view-model";

@Injectable({
  providedIn: "root",
})
export class CovidTestService {
  public url = environment.apiUrl + "api/covidTest/";

  constructor(public http: HttpClient) {}

  addCovidTest(model:AddCovidTestModel): Observable<any> {
    return this.http.post(this.url,model);
  }
  getConfirmation(covidTestId: string): Observable<any> {
    return this.http.get(this.url+"GetConfirmation/"+ covidTestId);
  }
  getCovidTestList(clinicIdentitifier:string) {
    return this.http.get<any>(this.url+"GetCovidTestsByClinicIdentifier/"+ clinicIdentitifier);
  }
  getCovidTestsById(id: string) {
    return this.http.get(this.url +"GetCovidTestsById/" +id).pipe();
  }  
  updateCovidTest(model: UpdateCovidTestVM): Observable<any>  {
    return this.http.patch<any>(this.url, model);
  } 
  VerifyCovidTestResult(Identifier: string,CovidTestId: string) {
    return this.http.get(this.url +"VerifyCovidTestResult/" +Identifier+"/"+CovidTestId).pipe();
  } 
  GetCovidTestResult(model: UpdateCovidTestVM):Observable<any>  {
    return this.http.post<any>(this.url+"GetCovidTestResult", model);
  }
  GenrateCovidTestPDF(model:PDFGenerateModel): Observable<Blob>{
    return this.http.post<Blob>( this.url + "GenrateCovidTestPDF", model,{ responseType: 'blob' as 'json' });
  }
  GetCovidTestDetailsById(Identifier: string,CovidTestId: string) {
    return this.http.get(this.url +"GetCovidTestDetailsById/" +Identifier+"/"+CovidTestId).pipe();
  }  
  
  SetCovidTestApproveStatus(id:number): Observable<any>  {
    return this.http.get<any>(this.url+"ApproveCovidTestStatus/" +id);
  }
  SetCovidTestRejectStatus(id:number): Observable<any>  {
    return this.http.get<any>(this.url+"RejectCovidTestStatus/" +id);
  }
  SetCovidTestInprogressStatus(id:number): Observable<any>  {
    return this.http.get<any>(this.url+"InProgressCovidTestStatus/" +id);
  }
  VerifyCovidTestQueued(Identifier: string,CovidTestId: string) {
    return this.http.get(this.url +"VerifyCovidTestQueued/" +Identifier+"/"+CovidTestId).pipe();
  } 
  GetCovidTestQueuedStatus(model: UpdateCovidTestVM):Observable<any>  {
    return this.http.post<any>(this.url+"GetCovidTestQueuedStatus", model);
  } 
  SetCovidTestWaitingStatus(model: UpdateCovidTestVM): Observable<any>  {
    return this.http.post<any>(this.url+"WaitingCovidTestStatus", model);
  } 
  SetCovidTestCompleteStatus(model: UpdateCovidTestVM): Observable<any>  {
    return this.http.post<any>(this.url+"CompleteCovidTestStatus" ,model);
  }

  SetCovidTestUpdateCancelStatus(id:number,reason:string): Observable<any>  {
    let model={'id':id, 'cancelReason':reason};
    return this.http.post<any>(this.url+"SetCovidTestUpdateCancelStatus",model );
  
    
  }

  getCovidCancelReason():Observable<any> {
    return this.http.get<any>(this.url + "getCovidCancelReason");
  }
}

