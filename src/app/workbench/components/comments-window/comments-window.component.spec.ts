import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { provideMockStore } from '@ngrx/store/testing';

import { CommentsWindowComponent } from './comments-window.component';

describe('CommentsComponent', () => {
  let component: CommentsWindowComponent;
  let fixture: ComponentFixture<CommentsWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentsWindowComponent],
      imports: [MatDialogModule],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentsWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('test initialization', () => {
    expect(component).toBeTruthy();
  });
});
