import { Injectable, inject } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { CommonService } from "../common/common.service";
import { catchError, filter, finalize, retry, switchMap, take, tap } from "rxjs/operators";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { TokenService } from "./token.service";
import { RefreshTokenModel } from "src/app/applicationModules/Models/LoginVM";
import { globalConstanst } from "src/app/shared-module/global-constants/global-constants";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  responseHolder: any;
  Difference_In_Time!: Number;
  JWTTimeInMs!: Number;
  AC_ALLOW_ORIGIN = "*";

  private isTokenRefreshing: boolean = false;

  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null as any);
    
  constructor(
    private common: CommonService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private tokenService: TokenService
  ) {}
  intercept(req:any, next:any) {
    // let authService = this.injector.get(AuthService)
    let tokenizedReq = req.clone(
      {
        headers: req.headers.set('Authorization', 'bearer ' + localStorage.getItem("accessToken"))
      }
    )
    return next.handle(tokenizedReq)
  }
  // intercept(
  //   req: HttpRequest<any>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<any>> {
   
  //   const languageKey  = this.common.getDefaultLanguage();
  //   if (!localStorage.getItem("accessToken")) {
  //     const clonedreq = req.clone({
  //       headers: req.headers.set(
  //         "language-key",
  //         languageKey
  //       ),
  //     });
  //     return next.handle(clonedreq.clone())
  //      .pipe(
  //       tap(
  //         (succ) => {},
  //         (err) => {
  //           this.spinner.hide();
  //           if (err.status === 401) {
  //             this.common.navigateToLogin();
  //           }
  //           console.log(err.error);
  //         }
  //       )
  //      );
  //   }

  //   if (localStorage.getItem("accessToken")) {

  //     return next.handle(this.attachTokenToRequest(req)).pipe(
  //       tap((event : HttpEvent<any>) => {
  //           if(event instanceof HttpResponse) 
  //           {
  //             //  console.log("Success");
  //           }
  //       })

  //      );

  //   }
  // }


   // Global error handler method 
   
   
   
   private handleError(errorResponse : HttpErrorResponse) 
   {
       let errorMsg : string;

       if(errorResponse.error instanceof Error) 
       {
            // A client-side or network error occurred. Handle it accordingly.
           errorMsg = "An error occured : " + errorResponse.error.message;
       } else 
       {
           // The backend returned an unsuccessful response code.
       // The response body may contain clues as to what went wrong,
       errorMsg = `Backend returned code ${errorResponse.status}, body was: ${errorResponse.error}`;
       }
       this.spinner.hide();
       this.toastrService.error("Something went wrong.")
        return throwError(errorMsg);
   }

   private attachTokenToRequest(request: HttpRequest<any>) 
   {
    const languageKey  = this.common.getDefaultLanguage();
       return request.clone({
        headers: request.headers.set(
          "Authorization",
          "Bearer " + localStorage.getItem("accessToken")
        )
        .set(
          "language-key",
          languageKey
        ),
      });
      //  return request.clone(
      //    {setHeaders: {Authorization: `Bearer ${token}`}});
   }


   // Method to handle http error response
   private handleHttpResponseError(request : HttpRequest<any>, next : HttpHandler) 
   {

       // First thing to check if the token is in process of refreshing
       if(!this.isTokenRefreshing)  // If the Token Refresheing is not true
       {
           this.isTokenRefreshing = true;

           // Any existing value is set to null
           // Reset here so that the following requests wait until the token comes back from the refresh token API call
           this.tokenSubject.next(null as any);

           const refreshTokenObj = new RefreshTokenModel();
           refreshTokenObj.accessToken=  localStorage.getItem("accessToken") as any;
           refreshTokenObj.refreshToken = localStorage.getItem("refreshToken") as any;
           /// call the API to refresh the token
           return this.tokenService.refreshToken(refreshTokenObj).pipe(
               switchMap((tokenresponse: any) => {
                 this.spinner.hide();
                   if(tokenresponse.isSuccess) 
                   {
                       this.tokenSubject.next(tokenresponse.data.accessToken); 
                       localStorage.setItem("accessToken",tokenresponse.data.accessToken);
                       localStorage.setItem("refreshToken",tokenresponse.data.refreshToken);
                       return next.handle(this.attachTokenToRequest(request));

               } else {
                this.spinner.hide();
                return <any>this.common.logoutUser();
               }
                  
               }),
               catchError(err => {
                this.spinner.hide();
                 //  this.common.logoutUser();
                   return this.handleError(err);
               }),
               finalize(() => {
                 this.isTokenRefreshing = false;
                 this.spinner.hide();
               })
               );

       }
       else 
       {
           this.isTokenRefreshing = false;
           return this.tokenSubject.pipe(filter(token => token != null),
               take(1),
               switchMap(token => {
               return next.handle(this.attachTokenToRequest(request)).pipe(
                tap(
                  (event : HttpEvent<any>) => {
                    if(event instanceof HttpResponse) 
                    {
                      //  console.log("Success");
                    }
                })
        
               );
               }));
       }


      }
    }
 

