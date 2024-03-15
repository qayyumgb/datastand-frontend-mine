import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsSeedChipComponent } from './is-seed-chip.component';

describe('IsSeedChipComponent', () => {
  let component: IsSeedChipComponent;
  let fixture: ComponentFixture<IsSeedChipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IsSeedChipComponent]
    });
    fixture = TestBed.createComponent(IsSeedChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
