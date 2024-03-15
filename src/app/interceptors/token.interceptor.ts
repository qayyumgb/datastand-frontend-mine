import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';

import { AuthService, UrlsService } from '@app/services';
import { LoaderService } from '@app/services/loader.service';
@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private router: Router,
    private urls: UrlsService,
    private loader:LoaderService
  ) { }
  intercept( request: HttpRequest<any>,  next: HttpHandler ): Observable<HttpEvent<any>> {
    if (this.auth.token) {
      request = request.clone({
        setHeaders: { Authorization: `Token ${this.auth.token}` },
      });
    }

    return next.handle(request).pipe(
      tap(event => {
        this.loader.showLoader.next(true)
        if (event.type == HttpEventType.Response) {
          if (event.status == 200) {
            this.loader.showLoader.next(false)
          }
        }
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              // Redirect to login on unauthorized access.
              this.auth.clearStorage();
              this.router.navigateByUrl(this.urls.LOGIN_URL);
            }
          }
          return throwError(err);
        })
      })
      
    );
  }
}
