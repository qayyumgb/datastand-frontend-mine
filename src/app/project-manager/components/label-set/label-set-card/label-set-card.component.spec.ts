import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import the HttpClientTestingModule
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LabelSetCardComponent } from './label-set-card.component';

describe('LabelSetCardComponent', () => {
  let component: LabelSetCardComponent;
  let fixture: ComponentFixture<LabelSetCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabelSetCardComponent],
      imports: [HttpClientTestingModule, MatDialogModule, MatSnackBarModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LabelSetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
