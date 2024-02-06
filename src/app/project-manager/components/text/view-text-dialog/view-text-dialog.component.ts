import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Text } from '@app/interfaces';

@Component({
  selector: 'pm-view-text-dialog',
  templateUrl: './view-text-dialog.component.html',
  styleUrls: ['./view-text-dialog.component.scss'],
})
export class ViewTextDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Text) {}

  getLines(): string[] {
    return this.data.raw_string.split('\n') ?? [];
  }
}
