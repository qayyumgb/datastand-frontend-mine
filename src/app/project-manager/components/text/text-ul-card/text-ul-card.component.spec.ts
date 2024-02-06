import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import the HttpClientTestingModule
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { TextUlCardComponent } from './text-ul-card.component';

describe('TextUlCardComponent', () => {
  let component: TextUlCardComponent;
  let fixture: ComponentFixture<TextUlCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextUlCardComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatMenuModule,
        MatSnackBarModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TextUlCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
