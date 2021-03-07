import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { CommonService } from "src/app/Services/common/common.service";

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  constructor(private router: Router, private commonService: CommonService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let currentUser = this.commonService.getCurrentUser();
    if (currentUser && currentUser.accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      });
    }
    return next.handle(request);
  }
}
