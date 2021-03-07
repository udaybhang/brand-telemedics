import { Uploads } from "../uploads/Uploads";

export class AuthorizePaymentModel {
  public token!: string;
  public month!: number;
  public year!: number;
  public clinicIdentifier!: string;
}

export class PaymentChargesModel{
  public schedulingCharges!: string;
  public visitCharges!: string;
  public totalCharges!: string;
}

export class PaymentPageUrlRequestModel {
  public clinicIdentifier!: string;
  public customerName!: string;
  public type!: string;
  public covidTestTypeId!: number;
  public collectionId!: string;
}

export class PaymentPageUrlResponseModel {
  public pageUrl!: string;
  public orderId!: string;
  public isSandBoxAccount!: string;
}

export class SubmitPatientPaymentModel {
  collectionId!: string;
  //pymentRefNum: string;
  //pymentRefNum: string;
  dateOfBirth!: string;
  recordNumber!: string;
  insuranceImages!: Uploads[];
  paymentOrderId!: string;
}