import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import the HttpClientTestingModule
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { PublicLabelSetListPage } from './public-label-set-list.component';

describe('PublicLabelSetListComponent', () => {
  let component: PublicLabelSetListPage;
  let fixture: ComponentFixture<PublicLabelSetListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicLabelSetListPage],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicLabelSetListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
