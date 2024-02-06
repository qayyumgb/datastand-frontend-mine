import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LabelSetDetailsHeaderCardComponent } from './label-set-details-header-card.component';

describe('LabelSetDetailsHeaderCardComponent', () => {
  let component: LabelSetDetailsHeaderCardComponent;
  let fixture: ComponentFixture<LabelSetDetailsHeaderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabelSetDetailsHeaderCardComponent],
      imports: [HttpClientTestingModule, MatDialogModule, MatSnackBarModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LabelSetDetailsHeaderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
