import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { PractitionerContainerComponent } from './applicationModules/admin-module/modules/practitioner/practitioner-container.component';
import { PractitionerListComponent } from './applicationModules/admin-module/modules/practitioner/practitioner-list/practitioner-list.component';
import { LoginContainerComponent } from './applicationModules/login-module/login-container.component';
import { LoginComponent } from './applicationModules/login-module/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SuperAdmin_Admin_AuthGuard } from './shared-module/AuthGurd/roleAuthGuards/superadmin-admin.gaurd';
import { MMNoAuthGuard } from './shared-module/noAuthGuard/mmno-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  
  {path: '',  canActivate: [MMNoAuthGuard], component: LoginContainerComponent, children: [
    {path: 'admin', component: LoginComponent},
    { path: ':identifier/login', component: LoginComponent }
  ]
 
},
{
  path: "practitioner",
  component: PractitionerContainerComponent,
  children: [
    {
      path: "",
      canActivate: [SuperAdmin_Admin_AuthGuard],
      component: PractitionerListComponent,
    },
  ],
},
{ path: '404-not-found', component: NotFoundComponent },
{ path: '**', redirectTo: '404-not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
