import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { PractitionerService } from "src/app/Services/Practitioner/practitioner.service";
import { PractitionerDefaultInfoModel } from "src/app/applicationModules/Models/practitionerViewModel";
import {
  templateType,
  globalConstanst,
} from "src/app/shared-module/global-constants/global-constants";
import { GeneralDataService } from "src/app/Services/general-data/general-data-service";
import { SubSink } from "subsink";
import { ClinicThemeModel } from "src/app/applicationModules/Models/ClinicModel";
import { CommonService } from "src/app/Services/common/common.service";
import { ClinicService } from "src/app/Services/Clinic/clinicService";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-customizations",
  templateUrl: "./customizations.component.html",
  styleUrls: ["./customizations.component.css"],
})
export class CustomizationsComponent implements OnInit, OnDestroy {
  name = "ng2-ckeditor";
  guideMsg: string;
  ckeConfig: any;
  defaultMsgTemplate: string = globalConstanst.defaultMsgTemp;
  content: string;
  log: string = "";
  templateTypes = globalConstanst.templateTypes;
  languageOptions=globalConstanst.languages;
  templateTypesDB :any;
  templatePrefix = globalConstanst.templatePrefix;
  smsTemplateTypes: any;//globalConstanst.smsTemplateTypes;
  selectedtemplate: string;
  selectedKey:string;
  selectedSMStemplate:string;
  subscriptions = new SubSink();
  defaultLayout:string;
  fullPreviewLayout:string;
  clinicTheme: ClinicThemeModel;
  @ViewChild("myckeditor") ckeditor: any;
  isClinicAdmin=false;
  smsContent:string="";
  patientUrl:string;
  private translate: TranslateService
  constructor(
    private practitionerService: PractitionerService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private generalDataService: GeneralDataService,
    private commonService: CommonService,
    private clinicService:ClinicService
  ) {
    this.selectedtemplate = this.templateTypes[0].keyValue;
    //this.selectedSMStemplate = this.smsTemplateTypes[0].keyValue;
    this.guideMsg =
      "Guide: Do not alter anything inside: ##patient_name## , ##doctor_name## , ##time## or ##url##";
      this.isClinicAdmin = this.commonService.isUserLoggedIn(3);
      const clinicIdentifier = this.commonService.getIdentifier();
      this.patientUrl = window.origin + "/"+ clinicIdentifier+ "/patient"
  }

  ngOnInit() {
   // this.setCkConfig();
    //this.getTemplate(this.selectedtemplate);
   // this.getSMSTemplate(this.selectedSMStemplate)
    //this.getDefaultEmailLayout();
   // this.getMsgTemplate();
   this.selectedKey=this.commonService.getDefaultLanguage();

   this.getEmailTemplatesNameList("EMAIL",this.commonService.getDefaultLanguage());
   this.getSMSTemplatesNameList("SMS",this.commonService.getDefaultLanguage());
    this.clinicTheme = this.commonService.getClinicTheme();
  }
 getEmailTemplatesNameList(type,lang)
 {
  this.subscriptions.add(
    this.clinicService
      .getEmailSMSTemplate(type,0,lang,this.isClinicAdmin)
      .subscribe((res) => {
        if (res.isSuccess) {
          this.templateTypesDB = res.data;
        }
      })
  );
 }
 getSMSTemplatesNameList(type,lang)
 {
  this.subscriptions.add(
    this.clinicService
      .getEmailSMSTemplate(type,0,lang,this.isClinicAdmin)
      .subscribe((res) => {
        if (res.isSuccess) {
          this.smsTemplateTypes = res.data;
          
          if(this.smsTemplateTypes.length)
           this.selectedSMStemplate = this.smsTemplateTypes[0].appKey;
        }
      })
  );
 }

  copyPatientUrl(){
    this.copyTxt(this.patientUrl);
  }

  copyTxt(value) {
    const selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = value;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
    this.toastrService.show(this.translateText('COPIED'));
  }

  getTemplate(templateName:string)
  {
    if(this.isClinicAdmin)
    {
      this.getClinicOrMasterTemplate(templateName);
    }
    else 
    {
      this.getPractitionerTemplate(templateName);
    }
    
  }


  getSMSTemplate(templateType:string)
  {
    if(this.isClinicAdmin)
    {
      this.getClinicSMSTemplate(templateType);
    }
    else 
    {
      this.getPractitionerSMSTemplate(templateType);
    }
    
  }

  onSMSTemplateChange(selectedtemplate){
  
    //this.getPractitionerSMSTemplate(selectedtemplate);
    if(this.isClinicAdmin)
    {
      this.getClinicSMSTemplate(selectedtemplate);
    }
    else 
    {
      this.getPractitionerSMSTemplate(selectedtemplate);
    }
  
  }

  setCkConfig() {
    this.ckeConfig = {
      allowedContent: true,
      extraPlugins: "customDropDown",

      forcePasteAsPlainText: true,
      toolbar: [
        {
          name: "clipboard",
          items: [
            "Cut",
            "Copy",
            "Paste",
            "PasteText",
            "PasteFromWord",
            "-",
            "Undo",
            "Redo",
          ],
        },
        {
          name: "basicstyles",
          items: [
            "Bold",
            "Italic",
            "Underline",
            "Strike",
            "Subscript",
            "Superscript",
            "-",
            "RemoveFormat",
          ],
        },
        {
          name: "styles",
          items: ["Styles", "Format", "FontSize", "-", "TextColor", "BGColor"],
        },
        { name: "customDropDown" },
      ],
      removePlugins: "horizontalrule,tabletools,specialchar,about,list,others",
      removeButtons:
        "Save,NewPage,Preview,Print,Templates,Replace,SelectAll,Form,Checkbox,Radio,TextField,Textarea,Find,Select,Button,ImageButton,HiddenField,JustifyLeft,JustifyCenter,JustifyRight,JustifyBlock,CopyFormatting,CreateDiv,BidiLtr,BidiRtl,Language,Flash,Smiley,PageBreak,Iframe,Font,FontSize,TextColor,BGColor,ShowBlocks,Cut,Copy,Paste,Table,Image,Format,Source,Maximize,Styles,Anchor,SpecialChar,PasteFromWord,PasteText,Scayt,Undo,Redo,Strike,RemoveFormat,Indent,Outdent,Blockquote,Underline",
    };
  }

  getClinicDefaultMsgTemplate(template) {
    this.spinner.show();
    this.subscriptions.add(
      this.clinicService
        .getClinicTemplate(template)
        .subscribe((res) => {
          this.spinner.hide();
          if (res.isSuccess) {
            this.defaultMsgTemplate = res.data;
            // this.setCkConfig();
          } else {
            this.toastrService.error(res.message);
          }
        })
    );
  }


  getDefaultTemplate() {
    if(this.isClinicAdmin)
    {
      this.getOriginalDefaultTemplate();
    }
    else {
      this.getClinicTemplate(this.selectedtemplate);
    }
  }

  getOriginalDefaultTemplate() {
    this.subscriptions.add(
      this.generalDataService
        .getDefaultValueByKey(this.selectedtemplate)
        .subscribe((res) => {
          if (res.isSuccess) {
            this.content = res.data;
          }
        })
    );
  }


  getPractitionerTemplate(templateType: string) {
    this.spinner.show();
    this.subscriptions.add(
      this.practitionerService
        .getPractitionerTemplate(templateType,this.selectedKey)
        .subscribe((res) => {
          this.spinner.hide();
          if (res.isSuccess) {
            this.content = res.data;
     
          } else {
            this.toastrService.error(res.message);
          }
        })
    );
  }


  getPractitionerSMSTemplate(templateType: string) {
    this.spinner.show();
    this.subscriptions.add(
      this.practitionerService
       // .getTemplate(templateType)
       .getPractitionerTemplate(templateType,this.selectedKey)
        .subscribe((res) => {
          this.spinner.hide();
          if (res.isSuccess) {
            this.smsContent = res.data;
          } else {
            this.toastrService.error(res.message);
          }
        })
    );
  }


  getClinicTemplate(templateType: string) {
    this.spinner.show();
    this.subscriptions.add(
      this.clinicService
        .getClinicTemplate(templateType)
        .subscribe((res) => {
          this.spinner.hide();
          if (res.isSuccess) {
            this.content = res.data;
            // this.setCkConfig();
          } else {
            this.toastrService.error(res.message);
          }
        })
    );
  }

  getClinicOrMasterTemplate(tName) {
    this.spinner.show();
    this.subscriptions.add(
      this.clinicService
        .getClinicOrMasterTemplate(tName,0,this.selectedKey)
        .subscribe((res) => {
          this.spinner.hide();
          if (res.isSuccess) {
            this.content = res.data;
            // this.setCkConfig();
          } else {
            this.toastrService.error(res.message);
          }
        })
    );
  }
  getClinicSMSTemplate(tName: string) {
    this.spinner.show();
    this.subscriptions.add(
      this.clinicService
      .getClinicOrMasterTemplate(tName,0,this.selectedKey)
        .subscribe((res) => {
          this.spinner.hide();
          if (res.isSuccess) {
            this.smsContent = res.data;
            // this.setCkConfig();
          } else {
            this.toastrService.error(res.message);
          }
        })
    );
  }

  saveSMSTemplate(){
    if(this.isSMSContentValid){
      if(this.isClinicAdmin){
        this.saveClinicSMSTemplate(this.smsContent,this.selectedtemplate);
      }
      else {
        this.savePractitionerSMSTemplate(this.smsContent);
      }
     
    }
  }

  get isSMSContentValid():boolean{
    if(this.selectedSMStemplate == "LinkMsgTemplate"){
      if(
      this.smsContent.includes("##patient_name##") &&
          this.smsContent.includes("##doctor_name##") &&
          this.smsContent.includes("##time##") &&
          this.smsContent.includes("##url##")){
            return true 
          }
          else {return false}
    }
    else if (this.selectedSMStemplate == "NewMeetingSMSTemplate"){
      if(
            this.smsContent.includes("##code##") &&
            this.smsContent.includes("##url##")){
              return true 
            }
            else {return false}
    }
    else if (this.selectedSMStemplate == "EndMeetingSMSTemplate"){
      if(
            this.smsContent.includes("##doctor_name##") &&
            this.smsContent.includes("##time##")){
              return true 
            }
            else {return false}
    }
    else if (this.selectedSMStemplate == "CencelMeetingSMSTemplate"){
      if(
        this.smsContent.includes("##doctor_name##") &&
        this.smsContent.includes("##time##")){
          return true 
        }
        else {return false}
    }
    else if (this.selectedSMStemplate == "ChangeMeetingSMSTemplate"){
      if(
        this.smsContent.includes("##doctor_name##") &&
        this.smsContent.includes("##time##")){
          return true 
        }
        else {return false}
    }
    return true;
  }

  saveTemplate() {
    
      if(this.isClinicAdmin){
        this.saveClinicTemplate(this.content,this.selectedtemplate);
      }
      else {
        this.savePractitionerTemplate(this.content);
      }
    // } else {
    //   this.toastrService.error("Do not alter anything in ##_##");
    // }
  }

  savePractitionerSMSTemplate(content)
  { this.spinner.show();
    var model = new PractitionerDefaultInfoModel();
    model.Text = content;
    model.TemplateType = this.selectedSMStemplate;
    model.TemplateName=this.selectedSMStemplate;
    model.Lang=this.selectedKey;
    this.subscriptions.add(
      this.practitionerService
        .updateAddMeetingTemplate(model)
        .subscribe((res) => {
          debugger;
          this.spinner.hide();
          if (res.isSuccess && res.data) {
            this.toastrService.success(this.translateText('SMS_TEMPLATE_UPDATED_SUCCESSFULLY'));
          }
        })
    );
  }


  translateText(text): string {
    return this.translate.instant(text);
  }

  savePractitionerTemplate(content)
  { this.spinner.show();
    var model = new PractitionerDefaultInfoModel();
    model.Text = content;
    model.TemplateType = this.selectedtemplate;
    model.TemplateName=this.selectedSMStemplate;
    model.Lang=this.selectedKey;
    this.subscriptions.add(
      this.practitionerService
        .updateAddMeetingTemplate(model)
        .subscribe((res) => {
          this.spinner.hide();
          debugger;
          if (res.isSuccess && res.data) {
           this.toastrService.success(this.translateText('TEMPLATE_UPDATED_SUCCESSFULLY'));
          }
        })
    );
  }

  saveClinicTemplate(content,template)
  { this.spinner.show();
    this.subscriptions.add(
      this.clinicService
        .updateClinicTemplate(template,content,this.selectedKey)
        .subscribe((res) => {
          this.spinner.hide();
          if (res.isSuccess && res.data) {
            this.toastrService.success(this.translateText('TEMPLATE_UPDATED_SUCCESSFULLY'));
          }
        })
    );
  }

  saveClinicSMSTemplate(content,template)
  { this.spinner.show();
    this.subscriptions.add(
      this.clinicService
        .updateClinicTemplate(template,content,this.selectedKey)
        .subscribe((res) => {
          this.spinner.hide();
          if (res.isSuccess && res.data) {
            this.toastrService.success(this.translateText('TEMPLATE_UPDATED_SUCCESSFULLY'));
          }
        })
    );
  }

  resetContent() {
    this.getTemplate(this.selectedtemplate);
  }

  resetSMSContent(){
    this.getSMSTemplate(this.selectedSMStemplate);
  }

  getDefaultEmailLayout() {
    this.subscriptions.add(
      this.practitionerService.getDefaultEmailLayout().subscribe(res => {
        if(res.isSuccess) {
          this.defaultLayout = res.data;
        }
      })
    )
  }

  onPreviewTemplate() {
    this.fullPreviewLayout = this.defaultLayout;
    let heading = "";
    let content = this.content;
    if(this.selectedtemplate=="AddMeetingEmailContent")
    {
      heading =  this.translateText("APPOINTMENT_SCHEDULED");
    } 
    else if(this.selectedtemplate=="EditMeetingEmailContent")
    {
      heading =  this.translateText("APPOINTMENT_UPDATED");
    }
    else if(this.selectedtemplate=="CancelMeetingEmailContent")
    {
      heading = this.translateText("APPOINTMENT_ENDED");
    }

    if(this.selectedtemplate !="CancelMeetingEmailContent") {
      let btn = '<p style="padding: 5px;font-size:22px; width:100%; color: #fff; text-align: center;">  <label style="background: ##btn_bg##; padding:10px; border-radius: 50px; color: #fff; text-decoration: none; display: inline-block;">##BtnTxt##</label> </p>';
      btn = btn.replace("##btn_bg##", this.clinicTheme.primaryBtnColor);
      btn = btn.replace("##BtnTxt##", "Start meeting");
      content = content + btn ;
    }
    this.fullPreviewLayout = this.fullPreviewLayout.replace("##content##",content);
    this.fullPreviewLayout = this.fullPreviewLayout.replace("##heading##",heading)
    const previewBtn = document.getElementById("previewBtn") as HTMLElement;
    previewBtn.click();
  }

  onTemplateChange(selectedtemplate) {
    
    this.getTemplate(selectedtemplate);

  }

  onLocalizationKeyChange(lang)
  {
    
   this.getEmailTemplatesNameList("EMAIL",lang);
   this.getSMSTemplatesNameList("SMS",lang);
   this.content='';
   this.smsContent='';
  }

  onChange($event: any): void {
    console.log("onChange");
  }

  onPaste($event: any): void {
    console.log("onPaste");
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
