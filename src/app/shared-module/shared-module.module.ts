import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./footer/footer/footer.component";
import { HeaderComponent } from "./header/header/header.component";
import { SidebarComponent } from "./sidebar/sidebar/sidebar.component";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { PortalModule } from "@angular/cdk/portal";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { CdkTableModule } from "@angular/cdk/table";
import { CdkTreeModule } from "@angular/cdk/tree";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatBadgeModule } from "@angular/material/badge";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTreeModule } from "@angular/material/tree";
import { RouterModule } from "@angular/router";
import { ToastrModule } from "ngx-toastr";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FilterPipe } from "./custom-filters/custom-filters";
import { MatFormFieldModule } from "@angular/material/form-field";
import { A11yModule } from "@angular/cdk/a11y";
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
} from "@angular-material-components/datetime-picker";
import { NgxMatMomentModule } from "@angular-material-components/moment-adapter";
import { NgxMatDrpModule } from "ngx-mat-daterange-picker";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
// import {
//   DlDateTimePickerModule,
//   DlDateTimeDateModule,
// } from "angular-bootstrap-datetimepicker";
import { CKEditorModule } from "ng2-ckeditor";
import { MatSelectSearchModule } from "./mat-select/mat-select-search.module";

import { NumberOnlyDirective } from "./Directives/number.directive";
import {
  MAT_COLOR_FORMATS,
  NgxMatColorPickerModule,
  NGX_MAT_COLOR_FORMATS,
} from "@angular-material-components/color-picker";
import { toogleSidebar } from "../Services/toogle/toogle-service";
import { ThemePreviewComponent } from "./theme-preview/theme-preview/theme-preview.component";

import { FullCalendarModule } from "@fullcalendar/angular"; // the main connector. must go first
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin
import interactionPlugin from "@fullcalendar/interaction"; // a plugin
import { SafePipe } from "./Pipe/SafePipe";
import { DataExchangeService } from "../Services/data-exchange/data-exchange-service";
import { NgxCaptchaModule } from "ngx-captcha";
import { ExportAsModule } from "ngx-export-as";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { PublisherComponent } from './open-tok/publisher/publisher.component';
import { SubscriberComponent } from './open-tok/subscriber/subscriber.component';
import { SafeHtmlPipe } from "./Pipe/safe-html-pipe";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SignaturePadModule } from '@ng-plus/signature-pad';
import { VerifyCodeComponent } from "../applicationModules/admin-module/modules/patient/verify-code/verify-code.component";
import { PaymentComponent } from "../applicationModules/admin-module/modules/patient/payment/payment.component";
import { DateOnlyDirective } from "./Directives/date.directive";
import { ConsentComponent } from "../applicationModules/admin-module/modules/covid-test/consent/consent.component";
import { TranslateModule } from "@ngx-translate/core";
import { LocalizedDatePipe } from "./Pipe/localized-date.pipe";
import { LocalizedDateTimePipe } from "./Pipe/localized-date-time.pipe";


FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
]);

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    FilterPipe,
    NumberOnlyDirective,
    DateOnlyDirective,
    ThemePreviewComponent,
    SafePipe,
    SafeHtmlPipe,
    ErrorPageComponent,
    PublisherComponent,
    SubscriberComponent,
    VerifyCodeComponent,
    PaymentComponent,
    ConsentComponent,
    LocalizedDatePipe,
    LocalizedDateTimePipe
  ],
  imports: [
    NgxMatSelectSearchModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CommonModule,
    RouterModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatMomentModule,
    NgxMatDrpModule,
    CKEditorModule,
    MatSelectSearchModule,
    NgxMatColorPickerModule,
    FullCalendarModule,
    NgxCaptchaModule,
    ExportAsModule,
    NgbModule,
    SignaturePadModule,
    TranslateModule
  ],

  schemas: [NO_ERRORS_SCHEMA],

  exports: [
    FooterComponent,
    HeaderComponent,
    PublisherComponent,
    SubscriberComponent,
    ErrorPageComponent,
    SidebarComponent,
    MatCheckboxModule,
    FilterPipe,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatMomentModule,
    NgxMatDrpModule,
    CKEditorModule,
    MatSelectSearchModule,
    NumberOnlyDirective,
    DateOnlyDirective,
    NgxMatColorPickerModule,
    ThemePreviewComponent,
    FullCalendarModule,
    NgxCaptchaModule,
    SafePipe,
    SafeHtmlPipe,
    LocalizedDatePipe,
    LocalizedDateTimePipe,
    ExportAsModule,
    NgbModule,
    SignaturePadModule,
    VerifyCodeComponent,
    PaymentComponent,
    ConsentComponent,
    TranslateModule
    // DlDateTimeDateModule, // <--- Determines the data type of the model
    // DlDateTimePickerModule,
  ],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS },
    toogleSidebar,
    SafePipe,
    SafeHtmlPipe,
    LocalizedDatePipe,
    LocalizedDateTimePipe,
    DataExchangeService
    
  ],
})
export class SharedModuleModule {}
