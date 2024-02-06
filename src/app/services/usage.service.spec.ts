import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UsageService } from './usage.service';

describe('UsageService', () => {
  let service: UsageService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(UsageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
