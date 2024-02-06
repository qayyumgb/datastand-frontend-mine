import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LabelSetNewsFeedItemComponent } from './label-set-news-feed-item.component';

describe('LabelSetNewsFeedItemComponent', () => {
  let component: LabelSetNewsFeedItemComponent;
  let fixture: ComponentFixture<LabelSetNewsFeedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabelSetNewsFeedItemComponent],
      imports: [HttpClientTestingModule, MatDialogModule, MatSnackBarModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LabelSetNewsFeedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
