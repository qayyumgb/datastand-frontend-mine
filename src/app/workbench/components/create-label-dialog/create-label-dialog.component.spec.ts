import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
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

import { CreateLabelDialogComponent } from './create-label-dialog.component';

describe('CreateLabelDialogComponent', () => {
  let component: CreateLabelDialogComponent;
  let fixture: ComponentFixture<CreateLabelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateLabelDialogComponent],
      imports: [
        MatFormFieldModule,
        MatAutocompleteModule,
        MatDialogModule,
        HttpClientModule,
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

    fixture = TestBed.createComponent(CreateLabelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('test initialization', () => {
    expect(component).toBeTruthy();
  });
});
