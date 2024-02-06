import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHeaderCardComponent } from './search-header-card.component';

describe('SearchHeaderCardComponent', () => {
  let component: SearchHeaderCardComponent;
  let fixture: ComponentFixture<SearchHeaderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchHeaderCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchHeaderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
