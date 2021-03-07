export interface ApiResponse<T> {
    statusCode:number ;
    message:string;
    data:T;
    errors: string[];
    isSuccess:boolean;
} 