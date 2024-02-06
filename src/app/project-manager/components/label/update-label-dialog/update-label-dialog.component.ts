import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Label } from '@app/interfaces';
import { LabelService } from '@app/services';

@Component({
  selector: 'pm-update-label-dialog',
  templateUrl: './update-label-dialog.component.html',
  styleUrls: [],
})
export class UpdateLabelDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Label,
    private labelService: LabelService,
    private snackbar: MatSnackBar
  ) {}

  onSubmit(label: Partial<Label>): void {
    this.labelService.patch(this.data.id!, label).subscribe((res) => {
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
      this.snackbar.open('✅ Label updated successfully', 'Dismiss');
    });
  }
}
