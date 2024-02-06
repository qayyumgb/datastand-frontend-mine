import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagListTruncatedComponent } from './tag-list-truncated.component';

describe('TagListTruncatedComponent', () => {
  let component: TagListTruncatedComponent;
  let fixture: ComponentFixture<TagListTruncatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagListTruncatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagListTruncatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
