import { ScheduleCovidTestModel } from "../covid-test-models/covid-test-model";

export class AddMeetingModel {
  public practitionerUserId!: string;
  public startDateTime!: string;
  public patientFullName!: string;
  public meetingId!: string;
  public patientEmail!: string;
  public patientPhoneNo!: string;
  public isendEmail!: boolean;
  public isendsms!: boolean;
  public timeZoneValue!: string;
  public localZoneName!: string;
  public PaymentTypeId!: number;
  public CashValue!: number;
  public isPatientNotify!: boolean;
  public preferredContact!: string;
  public billingStatusId!: number;
  public patientFirstName!: string;
  public patientLastName!: string;
}



export class ScheduleTeleVisitMeetingModel extends ScheduleCovidTestModel {
  startDateTime!: string;
  practitionerUserId!: string;
  uniqueSlotId!: string;
  practitionerId!: number;
}
