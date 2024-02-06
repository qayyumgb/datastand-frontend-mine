import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CreateLabelSetDialogComponent } from '@pm/components';

@Component({
  selector: 'pm-public-label-set-list-header-card',
  templateUrl: './public-label-set-list-header-card.component.html',
})
export class PublicLabelSetListHeaderCardComponent {
  constructor(private dialog: MatDialog) {}

  openCreateLabelSetDialog() {
    this.dialog.open(CreateLabelSetDialogComponent, {});
  }
}
