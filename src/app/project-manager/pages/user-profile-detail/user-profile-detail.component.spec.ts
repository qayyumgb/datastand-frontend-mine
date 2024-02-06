import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import the HttpClientTestingModule
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { UserProfileDetailPage } from './user-profile-detail.component';

describe('UserProfileDetailComponent', () => {
  let component: UserProfileDetailPage;
  let fixture: ComponentFixture<UserProfileDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileDetailPage],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
