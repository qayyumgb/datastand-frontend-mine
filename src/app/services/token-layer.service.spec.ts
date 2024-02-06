import { TestBed } from '@angular/core/testing';

import { TokenLayerService } from './token-layer.service';

describe('TokenLayerService', () => {
  let service: TokenLayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenLayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
