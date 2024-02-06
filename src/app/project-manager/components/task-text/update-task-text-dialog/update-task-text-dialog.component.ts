import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Text } from '@app/interfaces';
import { TextService } from '@app/services';

@Component({
  selector: 'pm-update-task-text-dialog',
  templateUrl: './update-task-text-dialog.component.html',
  styleUrls: [],
})
export class UpdateTaskTextDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Text,
    private textService: TextService
  ) {}

  onSubmit(text: Partial<Text>): void {
    this.textService.patch(this.data.id, text).subscribe((res: Text) => {
      // TODO(gustavoauma): Figure out why "this.data = res" doesn't work.
      // The frontend is only updated when modifying fields directly.
      this.data.name = res.name;
      this.data.description = res.description;
      this.data.modified = res.modified;
      this.data.author = res.author;
      this.data.langtag = res.langtag;
      this.data.raw_string = res.raw_string;
      this.data.tags = res.tags;
    });
  }
}
