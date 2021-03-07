import { ConsentModel } from "../consent-models/consent-model";
import { ConsentSignature } from "../covid-test-models/covid-test-model";

export class PatientDetailModel {
  public name!: string;
  public phone!: string;
  public code!: string;
  public email!: string;
  public clinicIdentifier!: string;
  public clinicName!: string;
  public preferredContact!: string;
}

export class PatientVerifyCodeModel {
  public code!: string;
  public collectionId!: string;
}

export class PatientProcessModel {
  public firstName: string = "";
  public phone: string = "";
  public timeSlot: string = "";
  public date!: Date;
  public startDateTime!: string;
  // public paymentType: string = "";
  public code: string = "";
  public clinicIdentifier!: string;
  public uniqueSlotId!: string;
  public practitionerId!: number;
  public userId!: string;
  public email!: string;
  public paymentTypeId!: number;
  public paymentTypeKeyName!: string;
  public visitReason!: string;
  public preferredContact!: string;
  public consents:ConsentModel[]= [];
}

export class AddPatientMeetingModel {
  public patientFullName!: string;
  public patientEmail!: string;
  public patientPhoneNo!: string;
  public selectedTimeSlot!: string;
  public requestedDate!: Date;
  public requestedDateTime!: string;
  // public paymentType: string;
  // public paymentType: string;
  public clinicIdentifier!: string;
  public zipCode!: string;
  public insuranceCardImagpaths!: string;
  public recordNumber!: string;
  public retRef!: string;
  public uniqueSlotId!: string;
  public practitionerId!: number;
  public dateOfBirth!: string;
  public userId!: string;
  public timeZoneValue!: string;
  public visitReason!: string;
  public paymentTypeId!: number;
  public preferredContact!: string;
  consentSignature:ConsentSignature[] = [];
}

export class MeetingConfirmModel{
  public patientName!: string;
  public meetingConfirmNumber!: string;
  public practitionerName!: string;
  public appointmentTime!: Date;
  public patientPhoneNo!: string;
  public meetingCode!: string;
  public clinicName!: string;
  public clinicPhone!: string;
  public startTime!: Date;
  public clinicLogoUrl!: string;
  public visitCharges!: string;
  public schedulingCharges!: string;
  public status!: string;
  public paymentType!: string;
  public email!: string;
  public visitReason!: string;
  public clinicIdentifier!: string;
  public preferredContact!: string;
}

export class AvailableSpeciality {
  id!: number;
  name!: string;
  practitionerId!: number;
  practitionerName!: string;
  practitionerUserId!: string;
}


export class PatientInfoModel{
  firstName!: string;
  lastName!: string;
  phone!: string;
  email!: string;
  code!: string;
  clinicIdentifier!: string;
  clinicName!: string;
  preferredContact!: string;
  reason!: string;
  clinicId!: number;
  reasonId!: number;
  covidTestTypeId!: number;
  portalType!: string;
  dateOfBirth!: string;
}

export class CheckFormProcessStatusModel{
  collectionId!: string;
  statusName!: string;
}