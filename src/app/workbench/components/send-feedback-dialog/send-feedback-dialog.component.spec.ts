import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { SendFeedbackDialogComponent } from './send-feedback-dialog.component';

describe('SendFeedbackDialogComponent', () => {
  let component: SendFeedbackDialogComponent;
  let fixture: ComponentFixture<SendFeedbackDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        ReactiveFormsModule,
      ],
      declarations: [SendFeedbackDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SendFeedbackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('test initialization', () => {
    expect(component).toBeTruthy();
  });
});
