import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AnnotationCountDialogComponent } from './annotation-count-dialog.component';

describe('AnnotationCountDialogComponent', () => {
  let component: AnnotationCountDialogComponent;
  let fixture: ComponentFixture<AnnotationCountDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnnotationCountDialogComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(AnnotationCountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('test initialization', () => {
    expect(component).toBeTruthy();
  });
});
