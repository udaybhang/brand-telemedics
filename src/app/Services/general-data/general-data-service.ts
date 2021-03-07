import { Injectable, OnDestroy } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PDFGenerateModel } from "src/app/applicationModules/Models/general-data-models/pdf-generate-model";

@Injectable({
  providedIn: "root",
})
export class GeneralDataService {
  public url = environment.apiUrl + "api/general/";

  constructor(public http: HttpClient) {}

  getIcdCodes(): Observable<any> {
    const Url = this.url + "GetICDCodes";
    return this.http.get(Url);
  }

  getICDCodesBySearch(icdcode: string): Observable<any> {
    return this.http.get<any>(this.url + "GetICDCodesBySearch/" + icdcode);
  }

  getCptCodes(): Observable<any> {
    return this.http.get<any>(this.url + "GetCPDCodes");
  }

  getCPTCodesBySearch(cptcode: string): Observable<any> {
    return this.http.get<any>(this.url + "GetCPTCodesBySearch/" + cptcode);
  }



  getCptModifiers(): Observable<any> {
    return this.http.get<any>(this.url + "GetCPTModifiers");
  }

  getCPTModifiersBySerach(cptmodifier: string): Observable<any> {
    return this.http.get<any>(this.url + "GetCPTModifiersBySerach/" + cptmodifier);
  }



  getDefaultValueByKey(key: string): Observable<any> {
    return this.http.get<any>(this.url + "GetDefaultValueByKey/" + key);
  }

  getMultitenantData(): Observable<any> {
    return this.http.get<any>(this.url + "GetMultitenantdata");
  }

  getRecapchaSiteKey(): Observable<any> {
    return this.http.get<any>(this.url + "GetRecapchaSiteKey");
  }

  getCountryCodes(): Observable<any> {
    return this.http.get<any>(this.url + "GetCountryCodes");
  }

  getMedicalSpecializations(): Observable<any> {
    return this.http.get<any>(this.url + "GetMedicalSpecializations");
  }

  getNotificationTypes():Observable<any> {
    return this.http.get<any>(this.url + "GetNotificationTypes");
  }

  getPaymentTypes():Observable<any> {
    return this.http.get<any>(this.url + "GetPaymentTypes");
  }
  getTimeZoneData():Observable<any> {
    return this.http.get<any>(this.url + "GetAllTimeZonesNameData");
  }
  getVisitReasons():Observable<any> {
    return this.http.get<any>(this.url + "GetVisitReasons");
  }

  getEndUserAgrmntText():Observable<any> {
    return this.http.get<any>(this.url + "GetEndUserAgrmntText");
  }

  updateEndUserAgrmntText(model:any):Observable<any> {
    return this.http.post<any>(this.url + "UpdateEndUserAgrmntText", model);
  }

  genratePDF(model:PDFGenerateModel): Observable<Blob>{
    return this.http.post<Blob>( this.url + "GenratePDF", model,{ responseType: 'blob' as 'json' });
  }

  getCovidTestReasons():Observable<any> {
    return this.http.get<any>(this.url + "GetCovidTestReasons");
  }
  
  getCovidTestTypes():Observable<any> {
    return this.http.get<any>(this.url + "GetCovidTestTypes");
  }

  getConsentTypes(): Observable<any> {
    return this.http.get<any>(this.url + "GetAllConsentsType");
  }  
  
  getBillingStatuses(): Observable<any> {
    return this.http.get<any>(this.url + "GetBillingStatuses");
  }  
  getCurrentCultureCurrencyName(): Observable<any> {
    return this.http.get<any>(this.url + "GetCurrentCultureCurrencyName");
    }
}

