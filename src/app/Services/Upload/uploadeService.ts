import { Injectable, EventEmitter, Output } from "@angular/core";
import { HttpClient, HttpRequest } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { CommonService } from "../common/common.service";

@Injectable({
  providedIn: "root",
})
export class UploadService {
  public baseurl = environment.apiUrl;
  //private commonApi ="api/common/";

  @Output() public onUploadFinished = new EventEmitter();
  constructor(private http: HttpClient,
    private commonService:CommonService) {}
  // uploadImages(files: any,meetingId="") {
  //   if (files.length === 0) return;
  //   const formData = new FormData();
  //   for (let file of files) 
  //   formData.append(file.name, file);
  //   formData.append('MeetingId', meetingId); 
  //   return this.http
  //     .post(this.baseurl + `api/General/Uploads`, formData)
  //     .pipe();
  // }

  uploadFiles(files: any,type:string, meetingId="") {
    if (files.length === 0) return;
    let url = this.baseurl + `api/General/Uploads/`+type;
  

    let clinicIdentifier =  this.commonService.getIdentifier();
    if(clinicIdentifier){
      url =url+ "?meetingId="+meetingId+"&clinicIdendtifier="+clinicIdentifier;
    }
    else {
      url =url+ "?meetingId="+meetingId;
    }

    const formData = new FormData();
    for (let file of files) 
    formData.append(file.name, file);
    if(meetingId){
      formData.append('MeetingId', meetingId); 
    }
    
    return this.http
      .post(url, formData)
      .pipe();
  }

  

 uploadCodes(files: any,customUploadType) {
    if (files.length > 0 ){
    const formData = new FormData();    
     // formData.append(file.name, file[0]);
     for (let file of files) 
    formData.append(file.name, file);
    formData.append('CustomUploadType',customUploadType);
      return this.http
      .post(this.baseurl + `api/General/UploadCodes`, formData)
      .pipe();
    }
  }





}
