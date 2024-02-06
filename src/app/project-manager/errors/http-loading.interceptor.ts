import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingDialogService } from '../../shared/loading/loading-dialog.service';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
  constructor(private loadingDialogService: LoadingDialogService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingDialogService.openDialog();
    return next
      .handle(request)
      .pipe(
        finalize(() => this.loadingDialogService.hideDialog())
      ) as Observable<HttpEvent<any>>;
  }
}
