import { Component, OnInit, AfterViewInit, OnDestroy, AfterViewChecked } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/Services/auth/auth.service";
import { CommonService } from "src/app/Services/common/common.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LoginVM } from "../../Models/LoginVM";
import { ClinicService } from "src/app/Services/Clinic/clinicService";
import { SubSink } from "subsink";
import { ClinicThemeModel } from "../../Models/ClinicModel";
import { GeneralDataService } from "src/app/Services/general-data/general-data-service";
import { DataExchangeService } from "src/app/Services/data-exchange/data-exchange-service";
import { SetTimoutSignalService } from "src/app/Services/data-exchange/set-timeout-signal";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, OnDestroy {
  subscriptions = new SubSink();
  identifierid!: any;
  admin!: string;
  Isphoto = false;
  isName = false;
  clinicName!: String;
  clinicTheme!: ClinicThemeModel;
  photopath!: string;
  public loginForm!: FormGroup;
  loginSubmitted = false;
  loginModel = {
    UserName: "",
    Password: "",
  };
  EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  currentUser: any;
  emailErrorMessage = "";
  passwordErrorMessage = "";
  invalidMessage = "";
  responseHolder: any;
  isAdmin: boolean = false;
  superAdminLogo!: string;
  logoBgColor!: string;
  returnUrl!: string;
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private common: CommonService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private clinicservice: ClinicService,
    private generalservice : GeneralDataService,
    private setTimoutSignalService: SetTimoutSignalService
  ) {
    this.isAdmin = this.router.url.startsWith("/admin");
    this.activatedRoute.queryParams.subscribe(params => {
     if(params['returnUrl']){
      this.returnUrl = params['returnUrl'];
     } 
   });
  }


  getMultitenantApp(){
    this.subscriptions.add(this.generalservice
        .getMultitenantData()
        .subscribe((response: any) =>{
          if (response != null && response.isSuccess && response.data != null){
            const admindetails =  response.data;
            if(admindetails != null){
            this.superAdminLogo  = admindetails.superAdminLogo;
            this.logoBgColor =  this.common.getLogoBgColor(admindetails.multitenanttext);
              if(this.isAdmin){
                let title = admindetails.multitenanttext as string;
                  title = title.replace("Powered by","");
                this.common.setTitle(title);
              }
          }
          } 
          this.spinner.hide();
        }));
}

  ngOnInit() {
    this.getMultitenantApp();
    this.checkUserLoggedIn();
  }



  checkUserLoggedIn() {
    var checkValue = this.common.isUserLoggedIn();
    if (checkValue == true) {
      this.common.redirectLoggedinUser();
    } else {
      this.initilize();
    }
   
  }

  initilize() {
    this.clinicTheme = new ClinicThemeModel();
    this.loginForm = this.fb.group({
      UserName: [
        "",
        [
          Validators.required,
          Validators.email,
        ],
      ],
      Password: ["", Validators.required],
    });
    if (this.isAdmin) {
      this.common.removeClinicLogoDetails();
      this.common.removeIdentifier();
    } else {
      this.identifierid = this.activatedRoute.snapshot.paramMap.get(
        "identifier"
      );
      if (this.identifierid) {
        this.common.setIdentifier(this.identifierid);
        this.getClinicLoginLogo();
        this.common.setPatientPotalBg(window.innerWidth);
      } else {
        this.common.navigateToError(401);
      }
    }
    this.spinner.hide();
  }

  getClinicLoginLogo() {
    this.subscriptions.add(
      this.clinicservice
        .getLogoPathByIdentifier(this.identifierid)
        .subscribe((response: any) => {
          if (response != null && response.isSuccess) {
            this.photopath = response.data.logoImgPath;
            this.clinicName = response.data.name;
            this.common.setClinicLogo(
              response.data.name,
              response.data.logoImgPath
            );
            this.Isphoto = true;
            this.isName = true;
          } else {
            this.common.navigateToError(401);
          }
        })
    );
  }

  get loginfrm() {
    return this.loginForm.controls;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  };

  Login() {
    this.loginSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.spinner.show();
      this.common.removeCurrentUser();
      let model: LoginVM;
      model = this.loginForm.value;
      model.ClinicIdentifier = this.identifierid ? this.identifierid : "admin";
      this.subscriptions.add(
        this.auth.login(model).subscribe((response) => {
          this.responseHolder = response;
          if (
            this.responseHolder != null &&
            this.responseHolder.isSuccess &&
            this.responseHolder.data.accessToken != null
          ) {
            if (this.responseHolder.data.userInfo.userType == 2 || this.responseHolder.data.userInfo.userType == 3) {
              this.common.storeClinicTheme(
                this.responseHolder.data.userInfo.clinicTheme
              );
            } else {
              this.common.clearStoredTheme();
            }

            this.common.setCurrentUser(
              this.responseHolder.data.userInfo,
              this.responseHolder.data.accessToken,
              this.responseHolder.data.refreshToken
            );

            this.setTimoutSignalService.setStartTimeout(true);

          if(this.returnUrl){
            console.log('his.returnUrl==', this.returnUrl)
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.common.redirectLoggedinUser();
          }

            
          } else {
            this.spinner.hide();
            this.toastrService.error(this.responseHolder.message);
          }
        }, error => {
          this.spinner.hide();
          this.toastrService.error("Please try again","Something went wrong");
          console.error(error);
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
