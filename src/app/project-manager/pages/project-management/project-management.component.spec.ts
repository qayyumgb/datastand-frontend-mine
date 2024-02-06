import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import the HttpClientTestingModule
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ProjectManagementPage } from './project-management.component';

describe('ProjectManagementComponent', () => {
  let component: ProjectManagementPage;
  let fixture: ComponentFixture<ProjectManagementPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectManagementPage],
      imports: [HttpClientTestingModule, MatMenuModule, MatSnackBarModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
