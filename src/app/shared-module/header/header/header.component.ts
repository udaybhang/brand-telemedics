import { Component, OnInit, Input } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

import { CommonService } from "src/app/Services/common/common.service";
import { toogleSidebar } from "src/app/Services/toogle/toogle-service";
import { StaticHelper } from "../../static-helper/static-helpers";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  loggedInUserData: any;
  clinicName!: string;
  isUserPractitioner:boolean;
  timeZone:any = StaticHelper.timeZoneAbbreviated();
  constructor(
    private commonService: CommonService,
    public toogleservice: toogleSidebar,
    public translate: TranslateService
  ) {
    this.isUserPractitioner = this.commonService.isUserLoggedIn(2);
  }

  ngOnInit() {
    this.loggedInUserData = this.commonService.getCurrentUser();
    if (this.loggedInUserData) {
      this.clinicName = this.loggedInUserData.clinicName;
    }
  }

  logoutUser() {
    this.commonService.logoutUser();
  }
  public openSidebar() {
    this.toogleservice.toggleSidebar.emit();
  }
  setLanguage(languageKey:string){
    this.translate.use(languageKey);
    this.commonService.storeDefaultLanguage(languageKey);
  }
}
