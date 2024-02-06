import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import the HttpClientTestingModule
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { LabelSetDetailPage } from './label-set-detail.component';

describe('LabelSetDetailComponent', () => {
  let component: LabelSetDetailPage;
  let fixture: ComponentFixture<LabelSetDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabelSetDetailPage],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatSnackBarModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LabelSetDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
