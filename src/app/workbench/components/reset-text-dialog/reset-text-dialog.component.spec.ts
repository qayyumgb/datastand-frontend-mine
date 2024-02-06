import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetTextDialogComponent } from './reset-text-dialog.component';

describe('ResetTextDialogComponent', () => {
  let component: ResetTextDialogComponent;
  let fixture: ComponentFixture<ResetTextDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResetTextDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetTextDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('test initialization', () => {
    expect(component).toBeTruthy();
  });
});
