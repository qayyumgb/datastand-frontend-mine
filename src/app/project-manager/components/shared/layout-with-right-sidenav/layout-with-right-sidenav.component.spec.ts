import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutWithRightSidenavComponent } from './layout-with-right-sidenav.component';

describe('EntityDetailWithSidenavComponent', () => {
  let component: LayoutWithRightSidenavComponent;
  let fixture: ComponentFixture<LayoutWithRightSidenavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutWithRightSidenavComponent],
    });
    fixture = TestBed.createComponent(LayoutWithRightSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
