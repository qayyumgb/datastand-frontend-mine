import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import the HttpClientTestingModule
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { LabelSetListPage } from './label-set-list.component';

describe('LabelSetListComponent', () => {
  let component: LabelSetListPage;
  let fixture: ComponentFixture<LabelSetListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabelSetListPage],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LabelSetListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
