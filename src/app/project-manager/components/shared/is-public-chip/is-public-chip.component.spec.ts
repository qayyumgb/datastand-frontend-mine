import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsPublicChipComponent } from './is-public-chip.component';

describe('IsPublicChipComponent', () => {
  let component: IsPublicChipComponent;
  let fixture: ComponentFixture<IsPublicChipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IsPublicChipComponent]
    });
    fixture = TestBed.createComponent(IsPublicChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
