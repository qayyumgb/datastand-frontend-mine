import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Label } from '@app/interfaces';
import { LabelService } from '@app/services';

@Component({
  selector: 'pm-update-task-label-dialog',
  templateUrl: './update-task-label-dialog.component.html',
  styleUrls: [],
})
export class UpdateTaskLabelDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Label,
    private labelService: LabelService,
    private snackbar: MatSnackBar
  ) {}

  onSubmit(taskLabel: Partial<Label>): void {
    this.labelService.patch(this.data.id!, taskLabel).subscribe((res) => {
      // TODO(gustavoauma): Figure out why "this.data = res" doesn't work.
      // The frontend is only updated when modifying fields directly.
      this.data.color = res.color;
      this.data.name = res.name;
      this.data.value = res.value;
      this.data.description = res.description;
      this.data.examples = res.examples;
      this.data.modified = res.modified;
      this.data.author = res.author;
      this.data.tags = res.tags;
      this.snackbar.open('✅ TaskLabel updated successfully', 'Dismiss');
    });
  }
}
