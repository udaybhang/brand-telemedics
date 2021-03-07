export class CovidTestReasonModel{
    id!: number;
    name!: string;
}

export class CovidTestTypeModel extends CovidTestReasonModel{
    otherNames!: string;
}

export class CovidTestTypesRequestModel extends CovidTestTypeModel {
    price!: number;
    displayPrice!: string;
  }