import { UserNotificationTypes } from "./general-data-models/notification-types-model";

export class PractitionerModel {
  id!: number;
  PractitionerId!: string;
  userId!: string;
  IsActive!: boolean;
  GenericMsgTemplate!: string;
  DefaultAddMeetingTemplate!: string;
  user!: UserModel;
  specialities:AddPractitionerSpecialities [] = [];
}

export class UserModel {
  id!: string;
  fullName!: string;
  Password!: string;
  BirthDatetime!: Date;
  phoneNumber!: string;
  email!: string;
  clinicId!: number;
  clinic!: ClinicModel;
  gender!: number;
  userNotifications: UserNotificationTypes[] =[];
  roles!: string[];
}

export class ClinicModel {
  Id!: number;
  name!: string;
  ClinicIdentifier!: string;
  PhoneNumber!: number;
  LogoImgPath!: string;
  CreatedDate!: Date;
  IsActive!: boolean;
}

export class PractitionerDefaultInfoModel {
  public PractitionerUserId!: string;
  public Text!: string;
  public TemplateType!: string;
  public Lang!: string;
  public TemplateName!: string;
}
export class AddPractitionerSpecialities {
  id!: number;
  isPrimary!: boolean;
  name!: string;
  practitionerUserId!: string;
}


export class AvailablePractitioner {
  id!: number;
  name!: string;
  practitionerUserId!: string;
}


export class PractitionerProfileUpdate {
  fullName!: string;
  phoneNumber!: string;
  // email: string;
  // email: string;
  gender!: number;
  UserNotificationTypes: UserNotificationTypes[] =[];
  PractitionerSpecialities:AddPractitionerSpecialities [] = [];
}
