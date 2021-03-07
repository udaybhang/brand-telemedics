import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthorizePaymentModel } from "src/app/applicationModules/Models/payment-models/payment-model";

@Injectable({
  providedIn: "root",
})
export class PaymentService {
  public url = environment.apiUrl + "api/payment/";

  constructor(public http: HttpClient) {}

  authorizePayment(model: AuthorizePaymentModel): Observable<any> {
    return this.http.post(this.url + "AuthorizePayment", model);
  }

  getPaymentUrl(model): Observable<any> {
    return this.http.post(this.url + "CreatePaymentUrl",model);
  }

}
