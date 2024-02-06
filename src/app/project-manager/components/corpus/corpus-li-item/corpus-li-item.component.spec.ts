import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import the HttpClientTestingModule
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CorpusLiItemComponent } from './corpus-li-item.component';

describe('CorpusLiItemComponent', () => {
  let component: CorpusLiItemComponent;
  let fixture: ComponentFixture<CorpusLiItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CorpusLiItemComponent],
      imports: [HttpClientTestingModule, MatDialogModule, MatSnackBarModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CorpusLiItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
