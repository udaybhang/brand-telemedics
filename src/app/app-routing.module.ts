import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ClinicComponent } from './clinic-admin/clinic.component';
import { ClinicAdminComponent } from './clinic-admin/clinic/clinic-admin.component';
import { ForgotPasswordComponent } from './forgot/forgot-password.component';
import { AuthGaurd } from './gaurds/auth-gaurd';
import { AdminLoginComponent } from './login/admin-login.component';
import { LoginComponent } from './login/login.component';
import { RoleLoginComponent } from './login/role-login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PractitionerContainerComponent } from './practitioner/container/practitioner-container.component';
import { PractitionerListComponent } from './practitioner/practitioner-list.component';
import { AnonGaurd } from './utility/anon-gaurd';

const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  
  {path: '',  canActivate: [AnonGaurd], component: LoginComponent, children: [
    {path: 'admin', component: AdminLoginComponent},
    { path: ':identifier/login', component: RoleLoginComponent }
  ]
 
},
{ path: 'practitioner', canActivate: [AuthGaurd], component: PractitionerContainerComponent, children: [
  { path: '', component: PractitionerListComponent }
] },
{ path: 'clinic', canActivate: [AuthGaurd], component: ClinicComponent, children: [
  { path: '', component: ClinicAdminComponent }
] },
{  path: 'forgotpassword', component: ForgotPasswordComponent  },
{ path: '404-not-found', component: NotFoundComponent },
{ path: '**', redirectTo: '404-not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
