import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import the HttpClientTestingModule
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { CorpusDetailPage } from './corpus-detail.component';

describe('CorpusDetailComponent', () => {
  let component: CorpusDetailPage;
  let fixture: ComponentFixture<CorpusDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CorpusDetailPage],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatSnackBarModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CorpusDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
