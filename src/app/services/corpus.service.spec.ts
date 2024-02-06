import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { CorpusService } from './corpus.service';

describe('CorpusService', () => {
  let service: CorpusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatSnackBarModule,
      ],
      providers: [
        // Add any additional providers here
      ],
    });
    service = TestBed.inject(CorpusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
