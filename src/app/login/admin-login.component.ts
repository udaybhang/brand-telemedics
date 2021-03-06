import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  public loginForm!: FormGroup;
    submitted = false;
  identifierid: any;
  roleLoginRes: any
  returnUrl: any;
  constructor(private formBuilder: FormBuilder, 
    private common: CommonService, private auth: AuthService, private flashMessage: FlashMessagesService) { 
    }
  

  Login() {
    let model: any = {}
    this.submitted = true;
    if (this.loginForm.invalid) {
        return;
    } 
     console.log(this.loginForm.value)
     model = this.loginForm.value;
     model.ClinicIdentifier = "admin";
     this.auth.login(model).subscribe(res=> {
       this.roleLoginRes = res;
       if (this.roleLoginRes.data !== null) {
       
          this.common.setCurrentUser(
            this.roleLoginRes.data.userInfo,
            this.roleLoginRes.data.accessToken,
            this.roleLoginRes.data.refreshToken
          );
           this.common.redirectLoggedinUser();
        
      
      } else {
        this.flashMessage.show(this.roleLoginRes.message,  { cssClass: 'alert-danger', timeout: 3000 });
      } 
     }, error=>{
      this.flashMessage.show('some error occured!', { cssClass: 'alert-danger', timeout: 3000 }) 
     })
  }

  initianliseUser() {
  
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
