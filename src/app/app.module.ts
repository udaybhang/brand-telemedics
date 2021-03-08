
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
import {DemoMaterialModule} from '../app/material-module';
import { MAT_COLOR_FORMATS, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from "@angular/material-moment-adapter";
import { NgxMatDrpModule } from "ngx-mat-daterange-picker";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxCaptchaModule } from "ngx-captcha";
import { DataExchangeService } from "./Services/data-exchange/data-exchange-service";
import { EmbedVideo } from 'ngx-embed-video';
// import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; 
import { MomentModule } from 'angular2-moment';
import { SetTimoutSignalService } from "./Services/data-exchange/set-timeout-signal";
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { PractitionerContainerComponent } from "./applicationModules/admin-module/modules/practitioner/practitioner-container.component";
import { PractitionerListComponent } from "./applicationModules/admin-module/modules/practitioner/practitioner-list/practitioner-list.component";
import { SidebarComponent } from "./shared-module/sidebar/sidebar/sidebar.component";
import { HeaderComponent } from "./shared-module/header/header/header.component";
import { toogleSidebar } from "./Services/toogle/toogle-service";
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent,
    LoginContainerComponent,
    LoginComponent,
    PractitionerContainerComponent,
    PractitionerListComponent,
    SidebarComponent,
    HeaderComponent,
    NotFoundComponent
  ],
  imports: [
     DemoMaterialModule,
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
    ToastrModule.forRoot(),
    // CKEditorModule,
    NgSelectModule,
    NgbModule,
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
    toogleSidebar,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
     
    },
    {
      provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
      useValue: { useUtc: true },
    },
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS },
    DataExchangeService,
    Title,
    SetTimoutSignalService
    // { provide: BrowserXhr, useClass: NgProgressBrowserXhr }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
