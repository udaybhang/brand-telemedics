export class ConsentViewModel {  
    public id!: number;
    public consentTypeId!: number;
    public formName!: string;
    public formContent!: string;
    public clinicId!: number;    
    public order!: number; 
    public createdDate!: Date;
    public createdBy!: string;
    public consentType!: string;
    public description!: string;
    public consentTypes!: ConsentTypes;
  }
  export class ConsentTypes{
    public id!: number;
    public name!: string;
  }