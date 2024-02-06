import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelSetDownloadDialogComponent } from './label-set-download-dialog.component';

describe('LabelSetDownloadDialogComponent', () => {
  let component: LabelSetDownloadDialogComponent;
  let fixture: ComponentFixture<LabelSetDownloadDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabelSetDownloadDialogComponent]
    });
    fixture = TestBed.createComponent(LabelSetDownloadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
