import { ConsentModel } from "../consent-models/consent-model";
import { Uploads } from "../uploads/Uploads";

export class ProcessCovidTestModel {
    firstName!: string;
    lastName!: string;
    preferredContact!: string;
    phone!: string;
    email!: string;
    testReason!: string;
    testTypeId!: number;
    dateOfBirth!: string;
    code!: string;
    time!: Date;
    timeSlot!: string;
    isContactVerified!: boolean;
    consents:ConsentModel[]= [];
    paymentTypeId!: number;
    paymentTypeKeyName!: string;
    practitionerId!: number;
    uniqueSlotId!: string;
    practitionerUserId!: string;
    clinicId!: number;
    testReasonId!: number;
}

export class AddCovidTestModel {
    firstName!: string;
    lastName!: string;
    preferredContact!: string;
    phone!: string;
    email!: string;
    testReason!: string;
    testTypeId!: number;
    dateOfBirth!: string;
    pymentRefNum!: string;
    requestedDateTime!: Date;
    timeSlot!: string;
    consentSignature:ConsentSignature[] = [];
    clinicIdentifier!: string;
    timeZoneValue!: string;
    paymentTypeId!: number;
    InsuranceImages!: Uploads[];
    testReasonId!: number;
    practitionerId!: number;
    uniqueSlotId!: string;
    practitionerUserId!: string;
    clinicId!: number;
}

export class ConsentSignature {
    consentId!: number;
    signatureString!: string;
}


export class CovidTestConfirmation{
    
    patientName!: string;
    confirmNumber!: string;
    practitionerName!: string;
    scheduleTime!: Date;
    patientPhoneNo!: string;
    clinicPhone!: string;
    clinicName!: string;
    clinicLogoUrl!: string;
    amount!: string;
    transactionId!: string;
    paymentType!: string;
    charges!: string;
    status!: string;
    patientEmail!: string;
    testReason!: string;
    testType!: string;
    clinicIdentifier!: string;
    preferredContact!: string;
    patientDateOfBirth!: Date;
  
}


export class ScheduleCovidTestModel {
    collectionId!: string;
    requestedDateTime!: Date;
    timeSlot!: string;
    paymentTypeId!: number;
    timeZoneValue!: string;
    localZoneName!: string;
}