import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsFormFieldComponent } from './tags-form-field.component';

describe('TagsFormFieldComponent', () => {
  let component: TagsFormFieldComponent;
  let fixture: ComponentFixture<TagsFormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagsFormFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagsFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
