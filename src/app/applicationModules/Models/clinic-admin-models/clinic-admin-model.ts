export class ClinicAvailabiltyeModel {
    Id!: number;
    ClinicId!: number;
    CreatedOn!: string;
    Title!: string;
    StartDate!: Date;
    EndDate!: Date;
    IsRecurring!: boolean;
    RepeatEvery!: number;
    RecurrenceType!: string;
    DaysSelected: number[] = [];
    GroupId!: string;
    MeetingId!: string;
    StartTime!: string;
    EndTime!: string;
    timeZoneValue!: string;
}

export class ClinicAvailabilityDelRequestModel {
    UserId!: string;
    PractitionerScheduleId!: number;
    UniqueSlotId!: string;
    StartDate!: Date;
    EndDate!: Date;
    IsRecursive!: boolean;
    covidTestId!: number;
}

export class GetClinicAvailabilityReqModel{
    startDate!: Date;
    endDate!: Date;

}