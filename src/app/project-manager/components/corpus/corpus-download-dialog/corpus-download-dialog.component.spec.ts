import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpusDownloadDialogComponent } from './corpus-download-dialog.component';

describe('CorpusDownloadDialogComponent', () => {
  let component: CorpusDownloadDialogComponent;
  let fixture: ComponentFixture<CorpusDownloadDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorpusDownloadDialogComponent]
    });
    fixture = TestBed.createComponent(CorpusDownloadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
