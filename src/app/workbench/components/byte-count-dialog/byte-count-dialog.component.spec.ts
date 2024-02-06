import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { provideMockStore } from '@ngrx/store/testing';

import { ByteCountDialogComponent } from './byte-count-dialog.component';

describe('ByteCountDialogComponent', () => {
  let component: ByteCountDialogComponent;
  let fixture: ComponentFixture<ByteCountDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ByteCountDialogComponent],
      imports: [MatDialogModule, MatDividerModule],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(ByteCountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('test initialization', () => {
    expect(component).toBeTruthy();
  });
});
