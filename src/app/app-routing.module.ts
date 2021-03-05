import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
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
  { path: '404-not-found', component: NotFoundComponent },
  {path: '',  canActivate: [AnonGaurd], component: LoginComponent, children: [
    {path: 'admin', component: AdminLoginComponent},
    { path: ':identifier/login', component: RoleLoginComponent }
  ]
 
},
{ path: 'practitioner', canActivate: [AuthGaurd], component: PractitionerContainerComponent, children: [
  { path: '', component: PractitionerListComponent }
] },
{ path: '**', redirectTo: '404-not-found' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
