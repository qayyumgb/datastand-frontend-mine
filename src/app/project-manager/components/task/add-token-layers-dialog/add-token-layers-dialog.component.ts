import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  BYTES_MODEL_ID,
  SENTENCES_MODEL_ID,
  WHITESPACE_MODEL_ID,
} from '@app/constants';

import { TaskService } from '@app/services';

@Component({
  selector: 'app-add-token-layers-dialog',
  templateUrl: './add-token-layers-dialog.component.html',
  styleUrls: ['../../base-crud-dialog.scss'],
})
export class AddTokenLayersDialogComponent {
  form = this.fb.group({
    bytes: false,
    sentences: false,
    whitespace: false,
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddTokenLayersDialogComponent>,
    private snackBar: MatSnackBar,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {}

  hasSelectedAModel(): boolean {
    return (
      this.form.value.bytes! ||
      this.form.value.sentences! ||
      this.form.value.whitespace!
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      // Convert booleans to Tokenize model IDs.
      // Iterate over the form values and push the model IDs to the models array.
      let models = [];
      if (this.form.value.bytes) {
        models.push(BYTES_MODEL_ID);
      }
      if (this.form.value.sentences) {
        models.push(SENTENCES_MODEL_ID);
      }
      if (this.form.value.whitespace) {
        models.push(WHITESPACE_MODEL_ID);
      }

      this.taskService.addTokenLayers(this.data, models).subscribe((res) => {
        this.dialogRef.close(true);
        this.snackBar.open(
          `✅ Token layers added to ${res.num_created} texts succesfully`,
          'Dismiss'
        );
      });
    }
  }
}
