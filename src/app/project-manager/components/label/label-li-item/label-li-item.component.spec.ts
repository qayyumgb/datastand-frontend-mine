import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import the HttpClientTestingModule
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LabelLiItemComponent } from './label-li-item.component';

describe('LabelLiItemComponent', () => {
  let component: LabelLiItemComponent;
  let fixture: ComponentFixture<LabelLiItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabelLiItemComponent],
      imports: [HttpClientTestingModule, MatDialogModule, MatSnackBarModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LabelLiItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
