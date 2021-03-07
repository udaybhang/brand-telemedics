import { PractitionerModel } from "../practitionerViewModel";

import { IcdCptCodeModel } from "./icd-cpt-code-model";
import { CptModifiersModel } from "./cpt-modifiers-model";
import { SelectItemModel } from "../general-data-models/general-data-model";

export class MeetingModel {
  public id!: number;
  public meetingId!: string;
  public practitionerId!: string;
  public linkMessage!: string;
  public startDateTime!: Date;
  public actualStartDateTime!: Date;
  public endDateTime!: Date;
  public meetingStatusId!: 0;
  public createdDate!: Date;
  public notes!: string;
  public patientEmail!: string;
  public patientPhoneNo!: string;
  public patientFullName!: string;
  public patientFirstName!: string;
  public patientLastName!: string;
  public meetingStatus!: MeetingStatus;
  public practitioner!: PractitionerModel;
  public zoomMeeting!: ZoomMeeting;
  public iCDCodesId!: number;
  public cPTCodesId!: number;
  public cptcode!: string; 
  public icDcode!: string;
  public cptModifierName!: string;
  public cPTModifierId!: number;
  public icdCodes!: IcdCptCodeModel;
  public cptCodes!: IcdCptCodeModel;
  public isAddedByPatient!: boolean;
  public meetingCode!: string;
  public meetingConfirmationNumber!: string;
  public cptModifier!: CptModifiersModel;
  public existingRecordNumber!: string;
  public insurancePolicyNumber!: string;
  public paymentTransactionsModel!: PaymentTransactionsModel;
  public addedByName!: string;
  public units!: number;
  public pos!: string;
  public amount!: number;
  public cashValue!: number;
  public paymentTypeId!: number;
  public isConsented!: boolean;
  public visitReason!: string;
  public displayTotalAmount!: string;
  public displayCashValue!: string;
  public preferredContact!: string;
  public meetingCPTDetails: MeetingCPTDetailsModel[]= [];
  public billingStatusId?: number;
  public billingStatus!: SelectItemModel;
  public otherEmail!: string;
}

export class MeetingStatus {
  public id!: number;
  public name!: string;
}

// export class VisitNotes {
//   public meetingId: number;
//   id: number;
//   notes: string;
// }

export class ZoomMeeting {
  public id!: number;
  public createdDate!: string;
  public zoomMeetingId!: string;
  public meetingId!: 0;
  public uuid!: string;
  public hostId!: string;
  public topic!: string;
  public type!: 0;
  public agenda!: string;
  public joinUrl!: string;
  public password!: string;
  public startTime!: string;
  public duration!: 0;
  public timezone!: string;
}

export class SaveMeetingInfoModel {
  public Id!: string;
  public Text!: string;
}

export class PaymentTransactionsModel{
  public Id!: number;
  public MeetingId!: number;
  public ChargeType!: string;
  public RefrenceNumber!: string;
  public Status!: string;
  public Account!: string;
  public BatchId!: string;
  public Amount!: number; 
  public TotalAmount!: number;
}

export class MeetingCPTDetailsModel {
  public cptCode!: string;
  public modifier!: string;
  public unit!: string;
  public timeInMinutes!: number;
}