import { CovidTestTypeModel } from "./general-data-models/covid-test-models";
import { SelectItemModel } from "./general-data-models/general-data-model";
import { PaymentTypeModel } from "./payment-models/payment-type";

export class clinicModel {
  public Id!: number;
  public Name!: string;
  public PhoneNumber!: string;
  public LogoImgPath!: string;
  public ClinicIdentifier!: string;
  public CreatedOn!: string;
  public IsActive!: boolean;
  public isSendEmail!: boolean;
  public ClinicEmail!: string;
  public HeaderBgColor!: string;
  public SidebarBgColor!: string;
  // public LinkTextColor: string;
  // public LinkTextColor: string;
  public ContentBgColor!: string;
  public PrimaryBtnColor!: string;
  public SecondaryBtnColor!: string;
  public SchedulingCharges!: number;
  public VisitCharges!: number;
  //public covidTestCharges : number;
  //public covidTestCharges : number;
  public TimeSlotInterval!: number;
  public paymentProcessorDetails!: ClinicPaymentProcessorDetails;
  //public ConnectCardDetails:ConnectCardDetails;
  //public ConnectCardDetails:ConnectCardDetails;
  public Address!: string;
  public patientportalBgColor!: string;
  public patientBgImgSml!: string;
  public patientBgImgMed!: string;
  public patientBgImgLrg!: string;
  public paymentTypesList: PaymentTypeModel[]=[];
  public treatmentConsent!: string;
  public isShowOtherVisitReason!: boolean;
  public clinicEmbeddedLink!: string;
  public subTitle!: string;
  public timeZone!: string;
  public filePassword!: string;
  public visitReasons!: string;
  public clinicCovidTestTypes: ClinicCovidTestType[]= [];
  public clinicCovidTestReasons: SelectItemModel[] =[];
  public clinicAdminsCount!: number;
  public clinicPractitionersCount!: number;
  public clinicMedicalSpecialities: SelectItemModel[] =[];
  public covidTestEmbeddedLink!: string;
  public currency!: string;
  public patient1stReminder!: boolean;
  public practitioner1stReminder!: boolean;
  public patient2ndReminder!: boolean;
  public practitioner2ndReminder!: boolean;
}

export class ClinicThemeModel {
  public clinicName!: string;
  public clinicIdentifier!: string;
  public logoImgPath!: string;
  public headerBgColor!: string;
  public sidebarBgColor!: string;
  // public linkTextColor: string;
  // public linkTextColor: string;
  public contentBgColor!: string;
  public primaryBtnColor!: string;
  public secondaryBtnColor!: string;
  public patientportalBgColor!: string;
  public patientBgImgSml!: string;
  public patientBgImgMed!: string;
  public patientBgImgLrg!: string;
  public clinicEmbeddedLink!: string; 
  public covidTestEmbeddedLink!: string;
}

export class ConnectCardDetails {
  public ClinicId!: number;
  public MerchantId!: string;
  public CardConnectApiToken!: string;
}
export class Timezonemodel {
  id!: number;
  displayName!: string;
  standardName!: string; 
}

export class ClinicPaymentProcessorDetails {
  public id!: number;
  public userName!: string; 
  public password!: string;
}

export class ClinicCovidTestType {
  public covidTestTypeId!: number;
  public price!: number;
  public covidTestType!: CovidTestTypeModel;
}
 
export class ClinicCovidTestTypeField {
  price!: number;
  isChecked!: boolean;
  id!: number;
  name!: string;
}

