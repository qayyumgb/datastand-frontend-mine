import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Label, Task } from '@app/interfaces';
import { LabelService } from '@app/services';

@Component({
  selector: 'pm-create-task-label-dialog',
  templateUrl: './create-task-label-dialog.component.html',
  styleUrls: [],
})
export class CreateTaskLabelDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private dialogRef: MatDialogRef<CreateTaskLabelDialogComponent>,
    private labelService: LabelService,
    private snackbar: MatSnackBar
  ) {}

  onSubmit(label: Partial<Label>): void {
    this.labelService
      .create({ ...label, content_type: 'task', object_id: this.data.id })
      .subscribe(() => {
        this.dialogRef.close(true);
        this.snackbar.open('✅ TaskLabel created successfully', 'Dismiss');
      });
  }
}
