import { AddPractitionerSpecialities } from "./practitionerViewModel";

export class AddPractitioner {
  Id!: number;
  fullName!: string;
  CreatedOn!: string;
  IsActive!: boolean;
  Email!: string;
  Password!: string;
  ClinicId!: number;
  gender!: number;
  phoneNumber!: string;
  practitionerSpecialities : AddPractitionerSpecialities[] = [];
}
