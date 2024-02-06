import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { provideMockStore } from '@ngrx/store/testing';

import { ClearAllAnnotationsDialogComponent } from './clear-all-annotations-dialog.component';

describe('ClearAllAnnotationsDialogComponent', () => {
  let component: ClearAllAnnotationsDialogComponent;
  let fixture: ComponentFixture<ClearAllAnnotationsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClearAllAnnotationsDialogComponent],
      imports: [MatDialogModule],
      providers: [
        provideMockStore({}),
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClearAllAnnotationsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
