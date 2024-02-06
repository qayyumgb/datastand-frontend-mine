import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Label, LabelSet } from '@app/interfaces';
import { LabelService } from '@app/services';

@Component({
  selector: 'pm-create-label-dialog',
  templateUrl: './create-label-dialog.component.html',
  styleUrls: [],
})
export class CreateLabelDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: LabelSet,
    private dialogRef: MatDialogRef<CreateLabelDialogComponent>,
    private labelService: LabelService,
    private snackbar: MatSnackBar
  ) {}

  onSubmit(label: Partial<Label>): void {
    this.labelService
      .create({ ...label, content_type: 'labelset', object_id: this.data.id })
      .subscribe(() => {
        this.dialogRef.close(true);
        this.snackbar.open('✅ Label created successfully', 'Dismiss');
      });
  }
}
