import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { PublicCorpusListHeaderCardComponent } from './public-corpus-list-header-card.component';

describe('PublicCorpusListHeaderCardComponent', () => {
  let component: PublicCorpusListHeaderCardComponent;
  let fixture: ComponentFixture<PublicCorpusListHeaderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicCorpusListHeaderCardComponent],
      imports: [HttpClientTestingModule, MatDialogModule, MatSnackBarModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicCorpusListHeaderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
