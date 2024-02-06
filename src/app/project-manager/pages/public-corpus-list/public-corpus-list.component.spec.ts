import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import the HttpClientTestingModule
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { PublicCorpusListPage } from './public-corpus-list.component';

describe('PublicCorpusListComponent', () => {
  let component: PublicCorpusListPage;
  let fixture: ComponentFixture<PublicCorpusListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicCorpusListPage],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicCorpusListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
