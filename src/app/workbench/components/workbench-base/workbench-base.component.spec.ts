import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { WorkbenchBaseComponent } from './workbench-base.component';

describe('WorkbenchBaseComponent', () => {
  let component: WorkbenchBaseComponent;
  let fixture: ComponentFixture<WorkbenchBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkbenchBaseComponent],
      imports: [HttpClientTestingModule, MatDialogModule, RouterTestingModule],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkbenchBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
