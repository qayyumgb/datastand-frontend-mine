import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsPendingChipComponent } from './is-pending-chip.component';

describe('IsPendingChipComponent', () => {
  let component: IsPendingChipComponent;
  let fixture: ComponentFixture<IsPendingChipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IsPendingChipComponent]
    });
    fixture = TestBed.createComponent(IsPendingChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
