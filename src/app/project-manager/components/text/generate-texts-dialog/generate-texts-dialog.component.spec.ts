import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateTextsDialogComponent } from './generate-texts-dialog.component';

describe('GenerateTextsDialogComponent', () => {
  let component: GenerateTextsDialogComponent;
  let fixture: ComponentFixture<GenerateTextsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateTextsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateTextsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
