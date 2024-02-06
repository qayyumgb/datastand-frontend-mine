import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsHeaderCardComponent } from './user-details-header-card.component';

describe('UserDetailsHeaderCardComponent', () => {
  let component: UserDetailsHeaderCardComponent;
  let fixture: ComponentFixture<UserDetailsHeaderCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDetailsHeaderCardComponent]
    });
    fixture = TestBed.createComponent(UserDetailsHeaderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
