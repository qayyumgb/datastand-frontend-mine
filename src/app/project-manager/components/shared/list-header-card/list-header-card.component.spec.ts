import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHeaderCardComponent } from './list-header-card.component';

describe('ListHeaderCardComponent', () => {
  let component: ListHeaderCardComponent;
  let fixture: ComponentFixture<ListHeaderCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListHeaderCardComponent]
    });
    fixture = TestBed.createComponent(ListHeaderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
