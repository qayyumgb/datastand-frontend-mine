import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import the HttpClientTestingModule
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { UsageDialogComponent } from './usage-dialog.component';

describe('UsageDialogComponent', () => {
  let component: UsageDialogComponent;
  let fixture: ComponentFixture<UsageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsageDialogComponent],
      imports: [HttpClientTestingModule, MatSnackBarModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UsageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
