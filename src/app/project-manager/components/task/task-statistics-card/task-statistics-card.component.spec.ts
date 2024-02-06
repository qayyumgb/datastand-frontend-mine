import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskStatisticsCardComponent } from './task-statistics-card.component';

describe('TaskStatisticsCardComponent', () => {
  let component: TaskStatisticsCardComponent;
  let fixture: ComponentFixture<TaskStatisticsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskStatisticsCardComponent],
    });
    fixture = TestBed.createComponent(TaskStatisticsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
