import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonService } from "../services/common.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    
    private authSerivce: AuthService,
    private commonService: CommonService,
    private flashServ: FlashMessagesService
  ) {
  }
  submitted = false;
  public forgotPasswordForm!: FormGroup;
  get f() { return this.forgotPasswordForm.controls; }

  ngOnInit() {
    this.forgotPasswordForm = this.fb.group({
      UserName: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
  });
  }
  get forpassfrm() {
    return this.forgotPasswordForm.controls;
  }
  IsMailSentSuccess = false;
  

  ForgotSubmit() {
    this.submitted = true;
    if (this.forgotPasswordForm.invalid) {
      return;
    } else {
      let model: any = {}
      model = this.forgotPasswordForm.value;
      
       var identifier = localStorage.getItem('Identifier');
       model.ClinicIdentifier =  identifier ? identifier : "admin";
       console.log('model====', model);
      if(model != null || model.UserName != ""){
       
          this.authSerivce
            .forgotPasswordLink(model)
            .subscribe((response: any) => {
              if (response && response.isSuccess) {
                this.flashServ.show(
                  "An email has been sent to you with your password reset link", {cssClass: 'alert-success', timeout: 3000}
                );
                this.IsMailSentSuccess = true;
                this.commonService.navigateToemailReset();
              } else {
                this.IsMailSentSuccess = false;
                this.flashServ.show(response.message, {cssClass: 'alert-danger', timeout: 3000});
              }
            })
        
      }
    }
  }

  login() {
    this.commonService.navigateToLogin();
  }
}
