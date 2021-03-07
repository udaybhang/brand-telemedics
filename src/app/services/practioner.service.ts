import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PractionerService {
  public url = environment.apiUrl + "api/practitioner";
  constructor(private http: HttpClient) { }
  getAllPractitionerList() {
    return this.http.get(this.url).pipe();
  }

 
}
