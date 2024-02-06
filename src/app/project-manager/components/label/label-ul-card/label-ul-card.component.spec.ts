import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import the HttpClientTestingModule
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { LabelUlCardComponent } from './label-ul-card.component';

describe('LabelUlCardComponent', () => {
  let component: LabelUlCardComponent;
  let fixture: ComponentFixture<LabelUlCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabelUlCardComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatMenuModule,
        MatSnackBarModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LabelUlCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
