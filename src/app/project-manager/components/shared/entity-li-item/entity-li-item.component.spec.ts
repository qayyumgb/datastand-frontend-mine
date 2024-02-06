import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityLiItemComponent } from './entity-li-item.component';

describe('EntityLiItemComponent', () => {
  let component: EntityLiItemComponent;
  let fixture: ComponentFixture<EntityLiItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntityLiItemComponent]
    });
    fixture = TestBed.createComponent(EntityLiItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
