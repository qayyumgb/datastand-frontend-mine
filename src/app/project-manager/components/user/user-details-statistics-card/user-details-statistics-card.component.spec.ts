import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsStatisticsCardComponent } from './user-details-statistics-card.component';

describe('UserDetailsStatisticsCardComponent', () => {
  let component: UserDetailsStatisticsCardComponent;
  let fixture: ComponentFixture<UserDetailsStatisticsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDetailsStatisticsCardComponent]
    });
    fixture = TestBed.createComponent(UserDetailsStatisticsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
