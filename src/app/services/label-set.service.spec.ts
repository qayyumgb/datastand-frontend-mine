import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LabelSetService } from './label-set.service';

describe('LabelSetService', () => {
  let service: LabelSetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
    });
    service = TestBed.inject(LabelSetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
