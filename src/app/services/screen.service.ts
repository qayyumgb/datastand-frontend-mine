import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  isSmall$: Observable<boolean>;
  isMedium$: Observable<boolean>;
  isLarge$: Observable<boolean>;
  isExtraLarge$: Observable<boolean>;

  constructor(private observer: BreakpointObserver) {
    this.isSmall$ = this.observer
      .observe('(max-width: 600px)')
      .pipe(map((result) => result.matches));
    this.isMedium$ = this.observer
      .observe('(max-width: 768px)')
      .pipe(map((result) => result.matches));
    this.isLarge$ = this.observer
      .observe('(max-width: 992px)')
      .pipe(map((result) => result.matches));
    this.isExtraLarge$ = this.observer
      .observe('(max-width: 1200px)')
      .pipe(map((result) => result.matches));
  }
}
