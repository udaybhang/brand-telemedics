export interface PaymentType {
    value: string;
    viewValue: string;
    isDisabled: boolean;
  }

  export class PaymentTypeModel {
    id!: number;
    name!: string;
    typeKey!: string;
  }