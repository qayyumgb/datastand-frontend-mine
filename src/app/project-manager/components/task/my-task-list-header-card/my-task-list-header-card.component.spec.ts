import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { MyTaskListHeaderCardComponent } from './my-task-list-header-card.component';

describe('MyTaskListHeaderCardComponent', () => {
  let component: MyTaskListHeaderCardComponent;
  let fixture: ComponentFixture<MyTaskListHeaderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyTaskListHeaderCardComponent],
      imports: [MatDialogModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MyTaskListHeaderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
