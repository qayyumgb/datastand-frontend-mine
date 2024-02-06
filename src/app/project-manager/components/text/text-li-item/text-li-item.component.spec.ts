import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import the HttpClientTestingModule
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { TextLiItemComponent } from './text-li-item.component';

describe('TextLiItemComponent', () => {
  let component: TextLiItemComponent;
  let fixture: ComponentFixture<TextLiItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextLiItemComponent],
      imports: [HttpClientTestingModule, MatDialogModule, MatSnackBarModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TextLiItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
