import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { provideMockStore } from '@ngrx/store/testing';

import { TokenLayersWindowComponent } from './token-layers-window.component';

describe('TokenLayersComponent', () => {
  let component: TokenLayersWindowComponent;
  let fixture: ComponentFixture<TokenLayersWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TokenLayersWindowComponent],
      imports: [MatDialogModule],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(TokenLayersWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('test initialization', () => {
    expect(component).toBeTruthy();
  });
});
