import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CreateLabelSetDialogComponent } from '@pm/components';

@Component({
  selector: 'pm-my-label-set-list-header-card',
  templateUrl: './my-label-set-list-header-card.component.html',
})
export class MyLabelSetListHeaderCardComponent {
  constructor(private dialog: MatDialog) {}

  openCreateLabelSetDialog() {
    this.dialog.open(CreateLabelSetDialogComponent, {});
  }
}
