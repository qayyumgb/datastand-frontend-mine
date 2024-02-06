import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { TokensTabComponent } from './tokens-tab.component';

describe('TokensTabComponent', () => {
  let component: TokensTabComponent;
  let fixture: ComponentFixture<TokensTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TokensTabComponent],
      providers: [provideMockStore({})],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TokensTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('test initialization', () => {
    expect(component).toBeTruthy();
  });
});
