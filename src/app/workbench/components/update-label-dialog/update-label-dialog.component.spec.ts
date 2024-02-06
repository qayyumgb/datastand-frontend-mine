import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { NgxColorsModule } from 'ngx-colors';

import { UpdateLabelDialogComponent } from './update-label-dialog.component';

describe('UpdateLabelDialogComponent', () => {
  let component: UpdateLabelDialogComponent;
  let fixture: ComponentFixture<UpdateLabelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateLabelDialogComponent],
      imports: [
        MatFormFieldModule,
        MatDialogModule,
        MatInputModule,
        NgxColorsModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
      ],
      providers: [
        provideMockStore({}),
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateLabelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('test initialization', () => {
    expect(component).toBeTruthy();
  });
});
