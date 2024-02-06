import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlyBigScreenComponent } from './only-big-screen.component';

describe('OnlyBigScreenComponent', () => {
  let component: OnlyBigScreenComponent;
  let fixture: ComponentFixture<OnlyBigScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlyBigScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlyBigScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
