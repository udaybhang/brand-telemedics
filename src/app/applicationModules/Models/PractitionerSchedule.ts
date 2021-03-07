export class PractitionerScheduleViewModel {
  Id!: Number;
  ScheduleId!: string;
  StartDate!: Date;
  EndDate!: Date;
  Title!: string;
  GroupId!: string;
  IsRecurring!: boolean;
  RecurrenceType!: string;
  Recurrence!: string;
  Occurences!: string;
  RepeatEvery!: Number;
}

export class PractitionerScheduleModel {
  Id!: Number;
  PractitionerId!: Number;
  CreatedOn!: string;
  Title!: string;
  StartDate!: Date;
  EndDate!: Date;
  IsRecurring!: boolean;
  RepeatEvery!: Number;
  RecurrenceType!: string;
  DaysSelected: Number[] = [];
  GroupId!: string;
  MeetingId!: string;
  StartTime!: string;
  EndTime!: string;
  timeZoneValue!: string;
}

export class PractitionerScheduleRecurring {
  PractitionerScheduleId!: Number;
  RecurringTypeId!: Number;
  SeperationCount!: Number;
  MaxOccurrance!: Number;
  WeekOfMonth!: Number;
  DayOfMonth!: Number;
  MonthOfYear!: Number;
  DayOfWeek!: Number;
}

export class AvailableTimeSlotReqModal {
  public requestDate!: Date;
  public clinicIdentifier!: string;
  public practitionerId!: number;
  public dateNumber!: DateNumber;
  public isAllPractitioner!: boolean;
  public medicalSpecialityId!: Number;
}

export class AvailableDatesReqModal{
  practitionerId!: string;
  timezone!: number;
  clinicIdentifier!: string;
}

export class DateNumber{
  public day!: number;
  public month!: number;
  public year!: number;
  public timezone!: number;
}

export class AvailableTimeSlotModel {
  public time!: string;
  public isSlotAvailable!: boolean;
  public slotDate!: Date;
  public endSlotDate!: Date;
  public slotFormat!: string;
  // public practitionerUserIds: string[] = [];
  // public practitionerUserIds: string[] = [];
  public uniqueSlotId!: string;
  public isPrimary!: boolean;
  public sortOrder!: number;
  public practitionerId!: number;
  public practitionerUserId!: string;
}


export class AvailableTimeReqModel
    {
        public StartDate!: Date;
        public EndDate!: Date;

    }
 


    export class DayModel {
        name!: string;
       checked!: boolean;
       key!: Number;
    }


    export class PractitionerScheduleDeleteRequestModel
    {
      UserId!: string;
        PractitionerScheduleId!: Number;

        UniqueSlotId!: string;

        StartDate!: Date;
        EndDate!: Date;

        IsRecursive!: boolean;

        MeetingId!: Number;

    }

  
  
  
  
