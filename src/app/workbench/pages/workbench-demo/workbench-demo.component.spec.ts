import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { WorkbenchDemoComponent } from './workbench-demo.component';

describe('WorkbenchDemoComponent', () => {
  let component: WorkbenchDemoComponent;
  let fixture: ComponentFixture<WorkbenchDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkbenchDemoComponent],
      imports: [HttpClientTestingModule, MatDialogModule, RouterTestingModule],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkbenchDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
