import { TestBed } from '@angular/core/testing';

import { SpanService } from './span.service';

describe('SpanService', () => {
  let service: SpanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
