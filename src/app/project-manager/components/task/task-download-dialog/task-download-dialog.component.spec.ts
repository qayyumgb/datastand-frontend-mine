import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDownloadDialogComponent } from './task-download-dialog.component';

describe('TaskDownloadDialogComponent', () => {
  let component: TaskDownloadDialogComponent;
  let fixture: ComponentFixture<TaskDownloadDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskDownloadDialogComponent]
    });
    fixture = TestBed.createComponent(TaskDownloadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
