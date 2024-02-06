import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LangTagService } from './lang-tag.service';

describe('LangTagService', () => {
  let service: LangTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(LangTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
