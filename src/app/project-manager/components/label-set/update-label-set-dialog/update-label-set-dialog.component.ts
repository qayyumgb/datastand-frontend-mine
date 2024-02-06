import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LabelSet } from '@app/interfaces';
import { LabelSetService } from '@app/services';

@Component({
  selector: 'pm-update-label-set-dialog',
  templateUrl: './update-label-set-dialog.component.html',
  styleUrls: [],
})
export class UpdateLabelSetDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: LabelSet,
    private labelSetService: LabelSetService
  ) {}

  onSubmit(labelSet: Partial<LabelSet>): void {
    this.labelSetService
      .patch(this.data.id, labelSet)
      .subscribe((res: LabelSet) => {
        // TODO(gustavoauma): Figure out why "this.data = res" doesn't work.
        // The frontend is only updated when modifying fields directly.
        this.data.author = res.author;
        this.data.description = res.description;
        this.data.modified = res.modified;
        this.data.name = res.name;
        this.data.tags = res.tags;
        this.data.is_public = res.is_public;
      });
  }
}
