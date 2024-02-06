import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorSquareComponent } from './color-square.component';

describe('ColorSquareComponent', () => {
  let component: ColorSquareComponent;
  let fixture: ComponentFixture<ColorSquareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColorSquareComponent]
    });
    fixture = TestBed.createComponent(ColorSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
