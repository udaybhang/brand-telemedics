import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

import { globalConstanst } from "../../global-constants/global-constants";
import { ClinicThemeModel } from "src/app/applicationModules/Models/ClinicModel";
import { CommonService } from "src/app/Services/common/common.service";
import { GeneralDataService } from "src/app/Services/general-data/general-data-service";

@Component({
  selector: "app-theme-preview",
  templateUrl: "./theme-preview.component.html",
  styleUrls: ["./theme-preview.component.css"],
})
export class ThemePreviewComponent implements OnChanges {
  @Input() public previewTheme: ClinicThemeModel;
  superAdminLogo: string;
  constructor(private commonService : CommonService, private generalservice : GeneralDataService) {
    this.previewTheme = new ClinicThemeModel();
    const admindetails = this.commonService.getMultitenantDetails();
    if(admindetails != null)
    this.superAdminLogo  = admindetails.superAdminLogo;
    this.previewTheme = {
      clinicIdentifier: "",
      clinicName: "Clinic Name",
      contentBgColor: globalConstanst.defaultClinicTheme.contentBgColor,
      headerBgColor: globalConstanst.defaultClinicTheme.headerBgColor,
      logoImgPath: this.superAdminLogo,
      primaryBtnColor: globalConstanst.defaultClinicTheme.primaryBtnColor,
      secondaryBtnColor: globalConstanst.defaultClinicTheme.secondaryBtnColor,
      sidebarBgColor: globalConstanst.defaultClinicTheme.sidebarBgColor,
      patientportalBgColor: globalConstanst.defaultClinicTheme.patientportalBgColor,
      patientBgImgLrg:"",
      patientBgImgMed:"",
      patientBgImgSml:"",
      clinicEmbeddedLink:"",
      covidTestEmbeddedLink:"",
    };
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.previewTheme = changes.previewTheme.currentValue;
  }
}
