import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstTimeTipCardComponent } from './first-time-tip-card.component';

describe('FirstTimeTipCardComponent', () => {
  let component: FirstTimeTipCardComponent;
  let fixture: ComponentFixture<FirstTimeTipCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirstTimeTipCardComponent]
    });
    fixture = TestBed.createComponent(FirstTimeTipCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
