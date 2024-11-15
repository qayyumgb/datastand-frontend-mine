import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolicyDialogComponent } from './privacy-policy-dialog.component';

describe('PrivacyPolicyDialogComponent', () => {
  let component: PrivacyPolicyDialogComponent;
  let fixture: ComponentFixture<PrivacyPolicyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrivacyPolicyDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacyPolicyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('test initialization', () => {
    expect(component).toBeTruthy();
  });
});
