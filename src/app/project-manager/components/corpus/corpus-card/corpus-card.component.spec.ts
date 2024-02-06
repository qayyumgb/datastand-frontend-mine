import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import the HttpClientTestingModule
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CorpusCardComponent } from './corpus-card.component';

describe('CorpusCardComponent', () => {
  let component: CorpusCardComponent;
  let fixture: ComponentFixture<CorpusCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CorpusCardComponent],
      imports: [HttpClientTestingModule, MatDialogModule, MatSnackBarModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CorpusCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
