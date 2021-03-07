export class ConsentModel {  
    public id!: number;
    public consentTypeId!: number;
    public formName!: string;
    public formContent!: string;
    public clinicId!: number;    
    public order!: number; 
    public createdDate!: Date;
    public createdBy!: string;
    public description!: string;
    public index!: number;
    public signBase64!: string;
    public covidTestReasonIds!: string;
    public covidTestReasonIdsArray!: number[];
    public acknowledgeMent!: string;
  }
  
export class ConsentType{
    public id!: number;
    public name!: string;
}