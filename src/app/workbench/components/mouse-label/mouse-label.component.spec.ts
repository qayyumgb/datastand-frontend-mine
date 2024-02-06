import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MouseLabelComponent } from './mouse-label.component';

describe('MouseLabelComponent', () => {
  let component: MouseLabelComponent;
  let fixture: ComponentFixture<MouseLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MouseLabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MouseLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('test initialization', () => {
    expect(component).toBeTruthy();
  });
});
