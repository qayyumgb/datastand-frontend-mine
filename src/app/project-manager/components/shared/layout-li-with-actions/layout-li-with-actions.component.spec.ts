import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutLiWithActionsComponent } from './layout-li-with-actions.component';

describe('LayoutLiWithActionsComponent', () => {
  let component: LayoutLiWithActionsComponent;
  let fixture: ComponentFixture<LayoutLiWithActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutLiWithActionsComponent]
    });
    fixture = TestBed.createComponent(LayoutLiWithActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
