import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MyLabelSetListHeaderCardComponent } from './my-label-set-list-header-card.component';

describe('MyLabelSetListHeaderCardComponent', () => {
  let component: MyLabelSetListHeaderCardComponent;
  let fixture: ComponentFixture<MyLabelSetListHeaderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyLabelSetListHeaderCardComponent],
      imports: [HttpClientTestingModule, MatDialogModule, MatSnackBarModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MyLabelSetListHeaderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
