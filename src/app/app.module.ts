
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AppRoutingModule} from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserModule, Title } from "@angular/platform-browser";
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";
// import { CKEditorModule } from "ng2-ckeditor";
import { ToastrModule } from "ngx-toastr";
import { NgxPaginationModule } from "ngx-pagination";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthInterceptor } from "./Services/auth/auth.interceptor";
import { LoginContainerComponent } from './applicationModules/login-module/login-container.component';
import { LoginComponent } from './applicationModules/login-module/login/login.component';
 import { NotFoundComponent } from './not-found/not-found.component';
 import { PractitionerListComponent } from './practitioner/practitioner-list.component';
 import { PractitionerContainerComponent } from './practitioner/container/practitioner-container.component';

import { NgxMatMomentModule } from "@angular-material-components/moment-adapter";
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
  NgxMatNativeDateModule,
} from "@angular-material-components/datetime-picker";

import {
  MatMomentDateModule,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from "@angular/material-moment-adapter";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { NgxMatDrpModule } from "ngx-mat-daterange-picker";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatIconModule } from "@angular/material/icon";
import { NgxCaptchaModule } from "ngx-captcha";
import { DataExchangeService } from "./Services/data-exchange/data-exchange-service";
import { EmbedVideo } from 'ngx-embed-video';
// import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; 
import { MomentModule } from 'angular2-moment';
import { SetTimoutSignalService } from "./Services/data-exchange/set-timeout-signal";
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { ClinicComponent } from "./clinic-admin/clinic.component";
import { ClinicAdminComponent } from "./clinic-admin/clinic/clinic-admin.component";
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent,
    LoginContainerComponent,
    LoginComponent,
    NotFoundComponent,
    PractitionerListComponent,
    PractitionerContainerComponent,
    ClinicComponent , 
    ClinicAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxMatDrpModule,
    //  NgxMatSelectSearchModule,
    //FileDropModule,
    NgxMatMomentModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    ToastrModule.forRoot(),
    MatMomentDateModule,
    MatButtonModule,
    MatInputModule,
    NgxMatNativeDateModule,
    MatDatepickerModule,
    // CKEditorModule,
    NgSelectModule,
    NgbModule,
    MatIconModule,
    NgxCaptchaModule,
    EmbedVideo.forRoot(),
    // NgIdleKeepaliveModule,
    MomentModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
      defaultLanguage: 'en-US'
  })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
     
    },
    {
      provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
      useValue: { useUtc: true },
    },
    DataExchangeService,
    Title,
    SetTimoutSignalService
    // { provide: BrowserXhr, useClass: NgProgressBrowserXhr }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
