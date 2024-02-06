import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseLiWithImgComponent } from './base-li-with-img.component';

describe('BaseLiWithImgComponent', () => {
  let component: BaseLiWithImgComponent;
  let fixture: ComponentFixture<BaseLiWithImgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseLiWithImgComponent],
    });
    fixture = TestBed.createComponent(BaseLiWithImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
