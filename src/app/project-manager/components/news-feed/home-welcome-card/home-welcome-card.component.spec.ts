import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeWelcomeCardComponent } from './home-welcome-card.component';

describe('HomeWelcomeCardComponent', () => {
  let component: HomeWelcomeCardComponent;
  let fixture: ComponentFixture<HomeWelcomeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeWelcomeCardComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatMenuModule,
        MatSnackBarModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeWelcomeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
