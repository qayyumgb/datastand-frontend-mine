import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { provideMockStore } from '@ngrx/store/testing';

import { LabelSetWindowComponent } from './label-set-window.component';

describe('LabelSetComponent', () => {
  let component: LabelSetWindowComponent;
  let fixture: ComponentFixture<LabelSetWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabelSetWindowComponent],
      imports: [MatDialogModule],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(LabelSetWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('test initialization', () => {
    expect(component).toBeTruthy();
  });
});
