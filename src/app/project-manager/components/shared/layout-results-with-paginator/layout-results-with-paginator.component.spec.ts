import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutResultsWithPaginatorComponent } from './layout-results-with-paginator.component';

describe('LayoutResultsWithPaginatorComponent', () => {
  let component: LayoutResultsWithPaginatorComponent;
  let fixture: ComponentFixture<LayoutResultsWithPaginatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutResultsWithPaginatorComponent]
    });
    fixture = TestBed.createComponent(LayoutResultsWithPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
