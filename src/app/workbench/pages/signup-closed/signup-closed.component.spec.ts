import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupClosedComponent } from './signup-closed.component';

describe('SignupClosedComponent', () => {
  let component: SignupClosedComponent;
  let fixture: ComponentFixture<SignupClosedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupClosedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
