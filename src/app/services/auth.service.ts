import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  private base_Url = environment.apiUrl;
  private accountApi = "api/account/";
  login(model: any) {
    const Url = this.base_Url + this.accountApi + "Login";
    return this.http.post(Url, model).pipe();
  }

  
}
