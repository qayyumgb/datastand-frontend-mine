import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsOfUseDialogComponent } from './terms-of-use-dialog.component';

describe('TermsOfUseDialogComponent', () => {
  let component: TermsOfUseDialogComponent;
  let fixture: ComponentFixture<TermsOfUseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TermsOfUseDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TermsOfUseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('test initialization', () => {
    expect(component).toBeTruthy();
  });
});
