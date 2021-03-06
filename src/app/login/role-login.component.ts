import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';
@Component({
  selector: 'app-role-login',
  templateUrl: './role-login.component.html',
  styleUrls: ['./role-login.component.css']
})
export class RoleLoginComponent implements OnInit {
  public loginForm!: FormGroup;
    submitted = false;
  identifierid: any;
  roleLoginRes: any
  returnUrl: any;
  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,
    private common: CommonService, private auth: AuthService, private flashMessage: FlashMessagesService, private router: Router) { 
    }
  

  Login() {
    let model: any = {}
    this.submitted = true;
    if (this.loginForm.invalid) {
        return;
    } 
     console.log(this.loginForm.value)
     model = this.loginForm.value;
     model.ClinicIdentifier = this.identifierid ? this.identifierid : "";
     this.auth.login(model).subscribe(res=> {
       this.roleLoginRes = res;
       console.log('this.roleLoginRes.data.userInfo.userType', this.roleLoginRes.data.userInfo.userType)
       if (this.roleLoginRes.data.accessToken != null) {
        if (this.roleLoginRes.data.userInfo.userType == 2 || this.roleLoginRes.data.userInfo.userType == 3) {
          this.common.setCurrentUser(
            this.roleLoginRes.data.userInfo,
            this.roleLoginRes.data.accessToken,
            this.roleLoginRes.data.refreshToken
          );
           this.common.redirectLoggedinUser();
        } 
      
      } else {
        this.flashMessage.show(this.roleLoginRes.message,  { cssClass: 'alert-danger', timeout: 3000 });
      } 
     }, error=>{
      this.flashMessage.show('some error occured!', { cssClass: 'alert-danger', timeout: 3000 }) 
     })
  }

  initianliseUser() {
    this.identifierid = this.activatedRoute.snapshot.paramMap.get(
      "identifier"
    );
    if (this.identifierid) {
      this.common.setIdentifier(this.identifierid);
    } else {
      this.common.navigateToError();
    }
    this.loginForm = this.formBuilder.group({
      UserName: ['', Validators.required],
      password: ['', Validators.required]
  });
  }
  get f() { return this.loginForm.controls; }
  ngOnInit(){
    this.initianliseUser();
   
  }

}
