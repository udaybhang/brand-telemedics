import { CovidTestStatus } from "src/app/applicationModules/Models/covid/covid-test-view-model";
import { environment } from "src/environments/environment";

export class globalConstanst {
  static defaultMsgTemp: string =
    "Hello, ##patient_name##.  " +
    "your meeting is scheduled with ##doctor_name##." +
    " Please join by clicking this link at :" +
    "##time##. ##url##";

  static templateTypes: templateType[] = [
    { name: "New Meeting ", keyValue: "AddMeetingEmailContent" },
    { name: "Change Meeting ", keyValue: "EditMeetingEmailContent" },
    { name: "Cancel Meeting ", keyValue: "CancelMeetingEmailContent" }
  ];

  static genders: genderM[] = [
    { value: 1, text: "Male" }, { value: 2, text: "Female" }, { value: 3, text: "Not Specified" }
  ];

  static smsTemplateTypes: templateType[] = [
    { name: "New Meeting ", keyValue: "LinkMsgTemplate" },
    { name: "New Meeting with Code", keyValue: "NewMeetingSMSTemplate" },
    { name: "Change Meeting ", keyValue: "ChangeMeetingSMSTemplate" },
    { name: "Cancel Meeting ", keyValue: "CencelMeetingSMSTemplate" },
    { name: "End Meeting ", keyValue: "EndMeetingSMSTemplate" },
  ];

  static templatePrefix: string[] = [
    "##patient_name##",
    "##doctor_name##",
    "##time##",
    "##url##",
  ];

  static defaultClinicTheme =  environment.client == "websia" ? 
  {
    primaryBtnColor: "#981b1e",
    secondaryBtnColor: "#6c757d",
    headerBgColor: "#981b1e",
    linkTextColor: "#fff",
    sidebarBgColor: "#444444",
    contentBgColor: "#f4f5fa",
  }  
  :{
    primaryBtnColor: "#4680ff",
    secondaryBtnColor: "#6c757d",
    headerBgColor: "#1c4387",
    linkTextColor: "#fff",
    sidebarBgColor: "#4680ff",
    contentBgColor: "#f4f5fa",
    patientportalBgColor: "#e6f2ff"
  };


  static signalType = {
    uploadDocuments: "UploadDocuments",
    waitingRoom: "WaitingRoom",
    endCallNotify: "EndCallNotify",
    patientLeftNotify: "PatientLeftNotify",
    paymentSubmit: "PaymentSubmit",
    updateMeetings: "UpdateMeetings",
    updateCovidTests: "UpdateCovidTests"
  };

  static uploadFileType = {
    shareFile: "share",
    logo: "logo",
    insuranceCard: "insurance",
    clinicBackGrounds: "clinicBackGrounds"
  };

  static currencies: currencyModel[] = [
    {code:"USD",symbol:"$"},
    {code:"EUR",symbol:"€"},
    {code:"BRL",symbol:"R$"}
  ];


  static roles = {
    clinicCreator: "ClinicCreator",
    clinicDeleter: "ClinicDeleter",
    clinicUpdater: "ClinicUpdater",
    doctorAdder: "DoctorAdder",
    doctorDeleter: "DoctorDeleter",
    doctorUpdater: "DoctorUpdater",
    clinicAdminAdder: "ClinicAdminAdder",
    clinicAdminDeleter: "ClinicAdminDeleter",
    clinicAdminUpdater: "ClinicAdminUpdater",
    superAdmin: "SuperAdmin",
    practitioner: "Practitioner",
    clinicAdmin: "ClinicAdmin",
    MedicalBiller: "MedicalBiller"
  }

  static defaultISDCode = "+1";

  static paymentTypeKeyNames = [
    { key: "CreditCard", displayText: "Online Card Payment", },
    { key: "Insurance", displayText: "Insurance Card", },
    { key: "ExistingPatient", displayText: " Existing Patients", }
  ]

  static paymentTypeKeys = {
    CreditCard: "CreditCard",
    Insurance: "Insurance",
    ExistingPatient: "ExistingPatient"
  }
  // static timezoneType = [
  //   { id: "004", displayText: "Pacific Standard Time", value: "(GMT-08:00) Pacific Time (US and Canada); Tijuana" },
  //   { id: "002", displayText: "Hawaiian Standard Time", value: "(GMT-10:00) Hawaii" },
  // ];
  static testResult = [
    { "name": "Positive", ID: "1" },
    { "name": "Negative", ID: "2" }
  ]
  static covidTestStatus: CovidTestStatus[] = [
    { id: 1, name: "Requested" },
    { id: 2, name: "Queued" },
    { id: 3, name: "InProgress" },
    { id: 4, name: "Completed" },
    { id: 5, name: "Rejected" },
  ]
  static ContactTypesList = [
    { text: 'TEXT_MESSAGE', value: 'sms' },
    { text: 'EMAIL', value: 'email' },
    { text: 'Whatsapp', value: 'whatsapp' },
  ];

  static portalType = { CovidTest: "CovidTest", TeleVisit: "TeleVisit" };

  static bookingProcessStatus = {
    IsPatientInfoSaved: "IsPatientInfoSaved",
    PatientVerified: "PatientVerified",
    PatientConsented:"PatientConsented",
    BookingDone:"BookingDone"
  };
  static defaultLanguage= "en-US";

  static languages : LanguageModel[] = [
    {key:"en-US",name:"English (US)" },
    {key:"pt-BR",name:"Português (BR)" },
    // {key:"es-ES",name:"Español" }
  ];
  

}



export class templateType {
  public name!: string;
  public keyValue!: string;
}

export class genderM {
  public value!: number;
  public text!: string;
}

export class LanguageModel{
  key!: string;
  name!: string;
}

export class currencyModel {
  public code!: string;
  public symbol!: string;
}