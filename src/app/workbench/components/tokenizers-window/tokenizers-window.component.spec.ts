import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { TokenizersWindowComponent } from './tokenizers-window.component';

describe('TokenizerComponent', () => {
  let component: TokenizersWindowComponent;
  let fixture: ComponentFixture<TokenizersWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TokenizersWindowComponent],
      imports: [HttpClientTestingModule],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(TokenizersWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('test initialization', () => {
    expect(component).toBeTruthy();
  });
});
