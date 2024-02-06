import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { provideMockStore } from '@ngrx/store/testing';

import { ClearAllTokensDialogComponent } from './clear-all-tokens-dialog.component';

describe('ClearAllTokensDialogComponent', () => {
  let component: ClearAllTokensDialogComponent;
  let fixture: ComponentFixture<ClearAllTokensDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClearAllTokensDialogComponent],
      imports: [MatDialogModule],
      providers: [
        provideMockStore({}),
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClearAllTokensDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('test initialization', () => {
    expect(component).toBeTruthy();
  });
});
