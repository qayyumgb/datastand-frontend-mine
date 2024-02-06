import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { provideMockStore } from '@ngrx/store/testing';

import { AnnotationsTabComponent } from './annotations-tab.component';

describe('AnnotationsTabComponent', () => {
  let component: AnnotationsTabComponent;
  let fixture: ComponentFixture<AnnotationsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnnotationsTabComponent],
      imports: [MatDialogModule],
      providers: [
        provideMockStore({}),
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AnnotationsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('test initialization', () => {
    expect(component).toBeTruthy();
  });

  it('test resolveLabelIndex', () => {
    // Note: labelIndex is 0-indexed, but the UI is 1-indexed.
    expect(component.resolveLabelIndex('1', null, 1)).toEqual(0);
    expect(component.resolveLabelIndex('1', '1', 1)).toEqual(0);
    expect(component.resolveLabelIndex('1', '2', 1)).toEqual(0);
    expect(component.resolveLabelIndex('2', null, 1)).toEqual(null);
    expect(component.resolveLabelIndex('2', '1', 1)).toEqual(null);
  });
});
