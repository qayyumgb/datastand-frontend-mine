import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SpanEffects } from './effects';

describe('SpanEffects', () => {
  let actions$: Observable<any>;
  let effects: SpanEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpanEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(SpanEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
