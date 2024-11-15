import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { NewsFeedService } from './news-feed.service';

describe('NewsFeedService', () => {
  let service: NewsFeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(NewsFeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
