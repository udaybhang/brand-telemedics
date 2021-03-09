import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ClinicThemeModel } from "src/app/applicationModules/Models/ClinicModel";
import { globalConstanst } from "src/app/shared-module/global-constants/global-constants";
import { Router } from "@angular/router";
import { PatientProcessModel } from "src/app/applicationModules/Models/patient-models/patient-model";
import { GetUploadedLogo } from "src/app/applicationModules/Models/GetUploadLogo/getUploadedLogo";
import { PractitionerService } from "../Practitioner/practitioner.service";
import { MultitenantModel } from "src/app/applicationModules/Models/multitenant-models/multitenant-model";
import { Title } from "@angular/platform-browser";
import { ProcessCovidTestModel } from "src/app/applicationModules/Models/covid-test-models/covid-test-model";
import { TokenService } from "../auth/token.service";


@Injectable({
  providedIn: "root",
})
export class CommonService {
  newcptcodes = [];
  newicdcodes = [];
  newcptmodcodes = [];
  constructor(private router: Router, private practitionerService: PractitionerService,
    private titleService: Title,
    private tokenSerVice: TokenService) { }

  setCurrentUser(userdata: any, accessToken: string, refreshToken: string) {
    localStorage.setItem("currentUser", JSON.stringify(userdata));
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }

 

 getRoles() :string[] {
   const userDataString = localStorage.getItem("currentUser");
  const userData = JSON.parse(JSON.stringify((userDataString)));
  return userData.roles;

 }

 setRoles(newRoles: any){
  const userDataString = localStorage.getItem("currentUser");
  const userData = JSON.parse(JSON.stringify((userDataString)));
  userData.roles = newRoles;
  localStorage.setItem("currentUser", JSON.stringify(userData));
 }

 isUserInAdminRole(role : string):boolean{
  const roles = this.getRoles();
  if(roles) {
    return roles.includes(role) || roles.includes(globalConstanst.roles.superAdmin);
  } else {
    return false;
  }
 }

 isUserInRole(role : string):boolean{
  const roles = this.getRoles();
  if(roles != undefined) {
    return  roles.includes(role);
  } else {
    return false;
  }
 
 }

  removeCurrentUser() {
    localStorage.removeItem("currentUser");
  }

  setIdentifier(identifier: string) {
    localStorage.setItem("Identifier", identifier);
  }

  getIdentifier(): string {
    const identifier = localStorage.getItem("Identifier");
    return identifier ? identifier : "";
  }

  removeIdentifier() {
    localStorage.removeItem("Identifier");
  }

  getCurrentUser(): any {
    const user = localStorage.getItem("currentUser");
    if (user) return JSON.parse(user);
    else return "";
  }

  getRefreshToken(): string {
    return JSON.parse(localStorage.getItem("refreshToken") || '{}');
    // return localStorage.getItem("refreshToken");
  }
 
  removeRefreshToken(){
    localStorage.removeItem("refreshToken");
  }
  logoutUser() {
    
    localStorage.removeItem("currentUser");
    localStorage.removeItem("accessToken");
    this.clearStoredTheme();
    this.removeRefreshToken();
    this.navigateToLogin();
  }

  navigateToLogin() {
   
    const cIdentifier = localStorage.getItem("Identifier");
    if (cIdentifier) {
      this.router.navigate([cIdentifier + "/login"]);
    } else {
      this.router.navigate(["/admin"]);
    }
  }

  navigateToemailReset() {
    const cIdentifier = localStorage.getItem("Identifier");
    if (cIdentifier) {
      // this.router.navigate([cIdentifier + "/login"]);
      this.router.navigate(["/forgotpassword/emailreset"]);
    } else {
      this.router.navigate(["/forgotpassword/emailreset"]);
    }
  }

  navigateToUrl(url:string, returnUrl:string ="") {
  
    if(returnUrl)
    this.router.navigate([url],{ queryParams: { returnUrl: returnUrl } });
    else 
    this.router.navigate([url]);
  
}

  navigateToError(code: number) {
    this.router.navigate(["error/" + code]);
  }

  isUserLoggedIn(userType = 0) {
    const userdata = localStorage.getItem("currentUser");
    const accessToken = localStorage.getItem("accessToken");
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(accessToken as any);
    if (userdata && userdata !== "" && accessToken != null ) {
      if (userType != 0) {
        // user type 1 is Super Admin, 2 is Practitioner, 3 is Clinic Admin
        const user = JSON.parse(userdata);
        return user.userType == userType;
      }
      return true;
    } else {
      return false;
    }
  }



  redirectLoggedinUser() {

    if (this.isUserLoggedIn()) {
      
      const user = JSON.parse(localStorage.getItem("currentUser") || '{}');
      
      console.log('his.returnUrl==', user.userType)
      if (user.userType == 2) {
        this.router.navigate(["meeting/list/"]);
      } else if (user.userType == 1) {
        this.router.navigate(["clinic"]);
      }
      else if (user.userType == 3) {
        
        this.router.navigate(["practitioner"]);
      }
    } else {
      this.navigateToLogin();
    }
  }

  setPatientDetails(patient: PatientProcessModel) {
    localStorage.setItem("patientDetails", JSON.stringify(patient));
  }

  clearPatientDetails() {
    localStorage.removeItem("patientDetails");
  }

  getPatientDetails(): PatientProcessModel {
   
    const patient = JSON.parse( JSON.stringify(localStorage.getItem("patientDetails")));
    if (patient) {
      return patient as PatientProcessModel;
    } else {
      return null as any;
    }
  }

  
  setCovidTestDetails(test: ProcessCovidTestModel) {
    localStorage.setItem("covidTestDetails", JSON.stringify(test));
  }

  clearCovidTestDetails() {
    localStorage.removeItem("covidTestDetails");
  }

  getCovidTestDetails(): ProcessCovidTestModel {
    
    const test = JSON.parse(JSON.stringify(localStorage.getItem("covidTestDetails")));
    if (test) {
      return test as ProcessCovidTestModel;
    } else {
      return null as any;
    }
  }

  

  clearStoredTheme() {
    localStorage.removeItem("clinicTheme");
  }

  getClinicTheme(): ClinicThemeModel {
    const clinicThemeString = localStorage.getItem("clinicTheme");
    return clinicThemeString ? JSON.parse(clinicThemeString) : globalConstanst.defaultClinicTheme;
  }

  storeClinicTheme(clinicTheme: ClinicThemeModel) {

    if (clinicTheme) {
      let theme = new ClinicThemeModel();

      theme.primaryBtnColor = clinicTheme.primaryBtnColor
        ? clinicTheme.primaryBtnColor
        : globalConstanst.defaultClinicTheme.primaryBtnColor;

      theme.secondaryBtnColor = clinicTheme.secondaryBtnColor
        ? clinicTheme.secondaryBtnColor
        : globalConstanst.defaultClinicTheme.secondaryBtnColor;

      theme.contentBgColor = clinicTheme.contentBgColor
        ? clinicTheme.contentBgColor
        : globalConstanst.defaultClinicTheme.contentBgColor;

      theme.clinicIdentifier = clinicTheme.clinicIdentifier
        ? clinicTheme.clinicIdentifier
        : "";

      theme.clinicName = clinicTheme.clinicName ? clinicTheme.clinicName : "";

      theme.headerBgColor = clinicTheme.headerBgColor
        ? clinicTheme.headerBgColor
        : globalConstanst.defaultClinicTheme.headerBgColor;

      // theme.linkTextColor = clinicTheme.linkTextColor
      //   ? clinicTheme.linkTextColor
      //   : globalConstanst.defaultClinicTheme.linkTextColor;

      theme.logoImgPath = clinicTheme.logoImgPath
        ? clinicTheme.logoImgPath
        : "";

      theme.sidebarBgColor = clinicTheme.sidebarBgColor
        ? clinicTheme.sidebarBgColor
        : globalConstanst.defaultClinicTheme.sidebarBgColor;

      theme.patientportalBgColor = clinicTheme.patientportalBgColor
        ? clinicTheme.patientportalBgColor!
        : globalConstanst.defaultClinicTheme.patientportalBgColor!;

        theme.patientBgImgLrg = clinicTheme.patientBgImgLrg;
        theme.patientBgImgMed = clinicTheme.patientBgImgMed;
        theme.patientBgImgSml = clinicTheme.patientBgImgSml;

      var clinicThemeString = JSON.stringify(theme);
      localStorage.setItem("clinicTheme", clinicThemeString);

      this.setTheme();
    }
  }

  setTheme() {
    const clinicThemeString = localStorage.getItem("clinicTheme");
    if (clinicThemeString) {
      const theme: ClinicThemeModel = JSON.parse(clinicThemeString);

      if(this.isUserLoggedIn(2) || this.isUserLoggedIn(3)) 
      {

      // Set Header Color
      let header = document.getElementsByClassName("theme-header");
      if (header.length > 0) {
        // let headerElement = header[0] as HTMLElement;
        // headerElement.style.backgroundColor = theme.headerBgColor;

        for (let a = 0; a < header.length; a++) {
          let headerElement = header[a] as HTMLElement;
          headerElement.style.backgroundColor = theme.headerBgColor;
        }
      }

      // Set SideBar Color
      let sideBar = document.getElementsByClassName("theme-sidebar");
      if (sideBar.length > 0) {
        for (let a = 0; a < sideBar.length; a++) {
          let sidebarElement = sideBar[a] as HTMLElement;
          sidebarElement.style.backgroundColor = theme.sidebarBgColor;
        }
      }

      // Set Table(Grid) Header Color
      let tableDiv = document.getElementsByClassName("theme-table");
      if (tableDiv.length > 0) {
        for (let j = 0; j < tableDiv.length; j++) {
          let tHeadings = tableDiv[j].getElementsByTagName(
            "th"
          ) as HTMLCollectionOf<HTMLTableHeaderCellElement>;

          for (let i = 0; i < tHeadings.length; i++) {
            tHeadings[i].style.backgroundColor = theme.sidebarBgColor;
          }
        }
      }

      // Set Primary-Button Color
      let primaryButtons = document.getElementsByClassName("btn-primary");
      if (primaryButtons.length > 0) {
        for (let p = 0; p < primaryButtons.length; p++) {
          let btn = primaryButtons[p] as HTMLElement;
          btn.style.backgroundColor = theme.primaryBtnColor;
          btn.style.borderColor = theme.primaryBtnColor;
        }
      }

      // Set Secondary-Button Color
      let secondaryButtons = document.getElementsByClassName("btn-secondary");
      if (secondaryButtons.length > 0) {
        for (let p = 0; p < secondaryButtons.length; p++) {
          let btn = secondaryButtons[p] as HTMLElement;
          btn.style.backgroundColor = theme.secondaryBtnColor;
        }
      }

      // Set Content background Color
      let contentbodyinner = document.getElementsByClassName(
        "an-content-body-inner"
      );
      if (contentbodyinner.length > 0) {
        let contentbodyinnerDiv = contentbodyinner[0] as HTMLElement;
        contentbodyinnerDiv.style.backgroundColor = theme.contentBgColor;
      }
      let contentbody = document.getElementsByClassName("an-content-body");
      if (contentbody.length > 0) {
        let contentbodyDiv = contentbody[0] as HTMLElement;
        contentbodyDiv.style.backgroundColor = theme.contentBgColor;
      }
    }
      else{
      let primaryButtons = document.getElementsByClassName("btn-primary");
      if (primaryButtons.length > 0) {
        for (let p = 0; p < primaryButtons.length; p++) {
          let btn = primaryButtons[p] as HTMLElement;
          btn.style.backgroundColor = theme.primaryBtnColor;
          btn.style.borderColor = theme.primaryBtnColor;
        }
      }
    }
    
    }
  }

  setClinicLogo(clinicname: string, logopath: string) {
    this.setTitle(clinicname);
    let getUploadedLogo = new GetUploadedLogo();
    getUploadedLogo.clinicName = clinicname;
    getUploadedLogo.logoPath = logopath;
    localStorage.setItem("clinicLogoDetails", JSON.stringify(getUploadedLogo));
  }

  getClinicLogo():GetUploadedLogo {
    
    const logoDetails = JSON.parse(JSON.stringify(localStorage.getItem("clinicLogoDetails")));
    return logoDetails;
  }

  removeClinicLogoDetails() {
    localStorage.removeItem("clinicLogoDetails");
    this.setTitle('remove');
  }

  checkPractitionerIsActive() {
    
    if (this.isUserLoggedIn(2)) {
      this.practitionerService.isPractitionerActive().subscribe(res => {
        if (!res.isSuccess || !res.data) {
      
          this.logoutUser();
        }
      });

      let checkActiveInterval = setInterval(() => {
        if (!this.isUserLoggedIn(2)) {
          clearInterval(checkActiveInterval);
        } else {
          this.practitionerService.isPractitionerActive().subscribe(res => {
            if (!res.isSuccess || !res.data) {
              clearInterval(checkActiveInterval);
            
              this.logoutUser();
            }
          })
        }

      }, 600000);
    }
  }



 
  storeCodes(newCode: string, type: string) {
    const key = type + "list";
    const existingCodes = this.getLocalStorageCodes(type);
    if (existingCodes) {
      if (!existingCodes.includes(newCode)) {
        let codes = [newCode,...existingCodes]
        if (codes.length > 10) {
          codes.splice(-1, 1);
        }
        localStorage.setItem(key, JSON.stringify(codes));
      }
    }
    else {
      const codes = [newCode]
      localStorage.setItem(key, JSON.stringify(codes));
    }
  }

  getLocalStorageCodes(type: string): string[] {
    let key = type + "list";
    const codes = localStorage.getItem(key);
    return codes ? JSON.parse(codes) : null;
  }

  removeCodes(type: string) {
    let key = type + "list";
    localStorage.removeItem(key);
  }

  setMultitenantDetails(multitenantText: string, superAdminLogo: string) {
    let multitenantdetatils = new MultitenantModel();
    multitenantdetatils.multitenanttext = multitenantText;
    multitenantdetatils.superAdminLogo = superAdminLogo;
    localStorage.setItem("multitenantdetatils", JSON.stringify(multitenantdetatils));
  }


  getMultitenantDetails(): MultitenantModel {
    
    const multitenantdetatils = JSON.parse(JSON.stringify(localStorage.getItem("multitenantdetatils")))
    return multitenantdetatils;
  }

  getTenantName(): string {
    const tenant = this.getMultitenantDetails();
    tenant.multitenanttext = tenant.multitenanttext.replace("Powered by","");
    return tenant.multitenanttext;
  }

  getLogoBgColor(tenantName: string): string {
    let isVisitTekLogo = false;
    let isVirtualCliniXLogo = false;
    if (tenantName.toLowerCase().includes("visittek")) {
      if (this.isUserLoggedIn()) {
        if (this.isUserLoggedIn(1)) {
          isVisitTekLogo = true;
        }
      } else {
        isVisitTekLogo = true;
      }
    }

    else if(tenantName.toLowerCase().includes("virtualclinix")) {
      if (this.isUserLoggedIn()) {
        if (this.isUserLoggedIn(1)) {
          isVirtualCliniXLogo = true;
        }
      } else {
        isVirtualCliniXLogo = true;
      }
    }
    return isVisitTekLogo ? "#1ef5ff" : isVirtualCliniXLogo ? "#fff" : "#fff";
  }

  setTitle(title:string) {
    let tenant = this.getMultitenantDetails();

    if(tenant && tenant.multitenanttext){
     tenant.multitenanttext = tenant.multitenanttext.replace("Powered by","");
    }

    if(title == 'remove'){
      if(tenant && tenant.multitenanttext){
        this.titleService.setTitle(tenant.multitenanttext);
      }
      else {
        this.titleService.setTitle("");
      }
      
    } else if(title){
    this.titleService.setTitle(title);
    }  
    else {
      const clinic = this.getClinicLogo();
      if(clinic)
      this.titleService.setTitle(clinic.clinicName);
      else {
       
        if(tenant && tenant.multitenanttext){
          this.titleService.setTitle(tenant.multitenanttext);
        }
      }
    }
  }

  setPatientPotalBg(width: number) {
    const clinicTheme = this.getClinicTheme();
    if (clinicTheme) {
      let patientPortalBg = document.getElementsByTagName("body");
      if (patientPortalBg[0]) {
        let patientPortalBgDiv = patientPortalBg[0] as HTMLElement;
        let url = "";
        if (width >= 1200) {
          url = clinicTheme.patientBgImgLrg ? clinicTheme.patientBgImgLrg
            : 'assets/images/backgroundweb.png';
        }
        else if (width >= 768 && width < 1200) {
          
          url = clinicTheme.patientBgImgMed ? clinicTheme.patientBgImgMed
            : 'assets/images/backgroundtab.png';
        } else if (width < 768) {
          url = clinicTheme.patientBgImgSml ? clinicTheme.patientBgImgSml
            : 'assets/images/backgroundmobile.png';
        }
        if (url) {

          patientPortalBgDiv.style.background = "linear-gradient( #c2b9b970 100%, #bdb7b785 100%),url('" + url + "')";
          patientPortalBgDiv.style.backgroundRepeat = " no-repeat";
          patientPortalBgDiv.style.backgroundAttachment = "fixed";
          patientPortalBgDiv.style.backgroundSize = "cover";          
        }
        else {
          patientPortalBgDiv.style.backgroundImage = "none";
          patientPortalBgDiv.style.backgroundColor = clinicTheme.patientportalBgColor;
        }
        const scheduleImg = document.getElementById("schimg") as HTMLDivElement;
        if(scheduleImg)
        {
          scheduleImg.style.display = clinicTheme.patientBgImgLrg || clinicTheme.patientBgImgMed ? "none":"block";
        }

      }
    }
  }
  setCovidPatientPotalBg(width: number) {
    const clinicTheme = this.getClinicTheme();
    if (clinicTheme) {
      let patientPortalBg = document.getElementsByTagName("body");
      if (patientPortalBg[0]) {
        let patientPortalBgDiv = patientPortalBg[0] as HTMLElement;
        let url = "";
        if (width >= 1200) {
          url = clinicTheme.patientBgImgLrg ? clinicTheme.patientBgImgLrg
          :  'assets/images/covidbackgroundweb.png';
        }
        else if (width >= 768 && width < 1200) {
          url = clinicTheme.patientBgImgMed ? clinicTheme.patientBgImgMed
          : 'assets/images/covidbackgroundtab.png';
        } else if (width < 768) {
          url =  clinicTheme.patientBgImgSml ? clinicTheme.patientBgImgSml
          :'assets/images/covidbackgroundmobile.png';
        }
        if (url) {
          patientPortalBgDiv.style.background = "url('" + url + "')";
          patientPortalBgDiv.style.backgroundRepeat = " no-repeat";
          patientPortalBgDiv.style.backgroundAttachment = "fixed";
          patientPortalBgDiv.style.backgroundSize = "cover";          
        }
        else {
          patientPortalBgDiv.style.backgroundImage = "none";
          patientPortalBgDiv.style.backgroundColor = clinicTheme.patientportalBgColor;
        }
      }
    }
  }

  storePatientPortalProcessId(id:string){
    localStorage.setItem("patientPortalProcessId",id)
  }

  storeCovidTestPortalProcessId(id:string){
    localStorage.setItem("covidTestPortalProcessId",id)
  }

  getPatientPortalProcessId():string {
    return JSON.parse(localStorage.getItem("patientPortalProcessId") || '{}');
  }

  getCovidTestPortalProcessId(): string {
    return JSON.parse(localStorage.getItem("covidTestPortalProcessId") || '{}');
  }

  clearPatientPortalProcessId() {
    return localStorage.removeItem("patientPortalProcessId")
  }

  clearCovidTestPortalProcessId() {
    localStorage.removeItem("covidTestPortalProcessId")
  }
  
  navigateToPortalStart(portalType: string){
    const clinicIdentifier = this.getIdentifier();
    const toPortalUrl = portalType == globalConstanst.portalType.CovidTest ? clinicIdentifier + "/covid-test" : clinicIdentifier + "/patient";
    this.router.navigate([toPortalUrl]);
  }

  storeDefaultLanguage(langKey:string){
    localStorage.setItem("defaultLanguage",langKey);
  }

  getDefaultLanguage(): string {
    const defaultLang = localStorage.getItem("defaultLanguage");
    if (defaultLang) {
      return defaultLang;
    }
    else {
      const browserLang = navigator.language;
      const filterLangs = globalConstanst.languages.filter(x => x.key == browserLang);
      return filterLangs.length > 0 ? filterLangs[0].key : globalConstanst.defaultLanguage;

    }
    // return defaultLang ? defaultLang : navigator.language;
  }

  storeClinicCurrency(currency: string) {
    localStorage.setItem("clinicCurrency", currency);
  }

  getClinicCurrency(): string {
    const currency = localStorage.getItem("clinicCurrency");
    return currency ? currency : "USD";
  }

  getClinicCurrencySymbol(): string {
    const currency = this.getClinicCurrency();
    const curObj = globalConstanst.currencies.find(x => x.code == currency);
    return curObj? curObj.symbol : "$";
  }


  getLocalCountryName():string
  {
    const localdate= new Date();
    var tt=localdate.toString().substring(localdate.toString().indexOf('(')+1)
    return tt.substr(0,tt.length-1);
  }

}
