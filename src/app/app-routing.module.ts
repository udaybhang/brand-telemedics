import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { LoginContainerComponent } from './applicationModules/login-module/login-container.component';
import { ClinicComponent } from './clinic-admin/clinic.component';
import { ClinicAdminComponent } from './clinic-admin/clinic/clinic-admin.component';
import { LoginComponent } from './applicationModules/login-module/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PractitionerContainerComponent } from './practitioner/container/practitioner-container.component';
import { PractitionerListComponent } from './practitioner/practitioner-list.component';
import { MMNoAuthGuard } from './shared-module/noAuthGuard/mmno-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  
  {path: '',  canActivate: [MMNoAuthGuard], component: LoginContainerComponent, children: [
    {path: 'admin', component: LoginComponent},
    { path: ':identifier/login', component: LoginComponent }
  ]
 
},
{ path: 'practitioner',  component: PractitionerContainerComponent, children: [
  { path: '', component: PractitionerListComponent }
] },
{ path: 'clinic',  component: ClinicComponent, children: [
  { path: '', component: ClinicAdminComponent }
] },
{ path: '404-not-found', component: NotFoundComponent },
{ path: '**', redirectTo: '404-not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
