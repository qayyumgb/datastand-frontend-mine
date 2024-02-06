import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDataCardComponent } from './no-data-card.component';

describe('NoDataCardComponent', () => {
  let component: NoDataCardComponent;
  let fixture: ComponentFixture<NoDataCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoDataCardComponent]
    });
    fixture = TestBed.createComponent(NoDataCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
