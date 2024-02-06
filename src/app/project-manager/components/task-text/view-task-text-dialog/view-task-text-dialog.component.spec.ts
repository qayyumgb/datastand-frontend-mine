import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskTextDialogComponent } from './view-task-text-dialog.component';

describe('ViewTaskTextDialogComponent', () => {
  let component: ViewTaskTextDialogComponent;
  let fixture: ComponentFixture<ViewTaskTextDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewTaskTextDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewTaskTextDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
