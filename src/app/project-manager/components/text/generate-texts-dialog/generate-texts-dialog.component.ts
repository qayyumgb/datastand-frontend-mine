import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-generate-texts-dialog',
  templateUrl: './generate-texts-dialog.component.html',
  styleUrls: ['./generate-texts-dialog.component.scss'],
})
export class GenerateTextsDialogComponent {
  form = this.fb.group({
    numTexts: [10, [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}
}
