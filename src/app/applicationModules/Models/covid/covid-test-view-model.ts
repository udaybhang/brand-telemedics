import { DecimalPipe } from "@angular/common";
import { clinicModel } from "../ClinicModel";
import { PaymentTypeModel } from "../payment-models/payment-type";
import { PractitionerModel } from "../practitionerViewModel";
import { CovidTestType } from "./covid-test-type-model";

export class CovidTestViewModel{
    public id!: number;
    public covidTestStatus!: string;
    public patientFirstName!: string;
    public patientLastName!: string;
    public patientDateOfBirth!: Date;   
    public patientPhoneNo!: string;
    public patientEmail!: string;
    public testReason!: string;
    public code!: string;
    public notes!: string;
    public pOS!: string;
    public preferredContact!: string;
    public isConsented!: boolean;
    public paymentTypeId!: number;
    public clinicId!: number;
    public covidTestStatusId!: number;
    public practitionerId!: number;   
    public covidTestTypeId!: number;
    public covidTestTypes!: CovidTestType;   
    public paymentTypes!: PaymentTypeModel;
    public practitioner!: PractitionerModel;
    public covidTestPatientConsents!: CovidTestPatientConsentViewModel[];
    public clinic!: clinicModel[];
    public testStatus!: CovidTestStatus;
    public createdDate!: Date;
    public scheduledDateTime!: Date;
    public completedDateTime!: Date;
    public testResultIsPositive!: boolean; 
    public amount!: number;
    public covidTestId!: string;
    public covidTestInsuranceDetails!: CovidTestInsuranceDetailsViewModel[];
    public CancelReason!: string;
    public IsCancelled!: boolean;
    public patientVehicleInfo!: string;
}
export class CovidTestStatus{
    public id!: number;
    public name!: string;
}
export class CovidTestReasons{
    public id!: number;
    public name!: string;
}

export class covidCancelReason
{
    public id!: number;
    public name!: string;
   
}
export class CovidTestPatientConsentViewModel{
    public id!: number;
    public covidTestId!: number;
    public clinicConsentFormId!: number;
    public signature!: string; 
}
export class CovidTestInsuranceDetailsViewModel{
    public id!: number;
    public covidTestId!: number;
    public imagePath!: string;
    public fileName!: string;  
}
export class UpdateCovidTestVM{
    public id!: number; 
    public patientFirstName!: string;
    public patientLastName!: string;
    public patientDateOfBirth!: string;   
    public patientPhoneNo!: string;
    public patientEmail!: string;
    public testReason!: string;
    public code!: string;
    public notes!: string;
    public pOS!: string;    
    public paymentTypeId!: number; 
    public covidTestStatusId!: number; 
    public covidTestTypeId!: number;     
    public practitioner!: PractitionerModel;
    public practitionerId!: number;
    public completedDateTime!: string;
    public testResultIsPositive!: boolean; 
    public covidTestId!: string;
    public scheduledDateTime!: string;
    public amount!: number;
    public patientVehicleInfo!: string;
}
export class CovidTestPDFViewModel
{
    public patientName!: string;
    public patientPhoneNo!: string;
    public paymentType!: string;
    public patientEmail!: string;
    public code!: string;
    public clinicPhone!: string;
    public clinicName!: string;
    public clinicLogoUrl!: string; 
    public clinicAddress!: string;
    public testReason!: string;
    public testType!: string;
    public notes!: string;
    public status!: string;
    public completedDateTime!: Date;    
    public preferredContact!: string;
    
}

 