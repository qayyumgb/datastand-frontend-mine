import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTokenLayersDialogComponent } from './add-token-layers-dialog.component';

describe('AddTokenLayersDialogComponent', () => {
  let component: AddTokenLayersDialogComponent;
  let fixture: ComponentFixture<AddTokenLayersDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTokenLayersDialogComponent]
    });
    fixture = TestBed.createComponent(AddTokenLayersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
