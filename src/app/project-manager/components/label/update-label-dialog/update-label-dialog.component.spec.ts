import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { UpdateLabelDialogComponent } from './update-label-dialog.component';

describe('UpdateLabelDialogComponent', () => {
  let component: UpdateLabelDialogComponent;
  let fixture: ComponentFixture<UpdateLabelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateLabelDialogComponent],
      imports: [HttpClientTestingModule, MatDialogModule, MatSnackBarModule],

      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            texts: [],
          },
        },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateLabelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
