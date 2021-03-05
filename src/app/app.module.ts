import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminLoginComponent } from './login/admin-login.component';
import { RoleLoginComponent } from './login/role-login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PractitionerListComponent } from './practitioner/practitioner-list.component';
import { PractitionerContainerComponent } from './practitioner/container/practitioner-container.component';
import { AuthGaurd } from './gaurds/auth-gaurd';
import { AnonGaurd } from './utility/anon-gaurd';
// import { MatSliderModule } from '@angular/material/slider';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, 
    AdminLoginComponent,
    RoleLoginComponent,
    NotFoundComponent,
    PractitionerListComponent,
    PractitionerContainerComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot()
    // MatSliderModule
  ],
  providers: [AuthGaurd, AnonGaurd],
  bootstrap: [AppComponent]
})
export class AppModule { }
