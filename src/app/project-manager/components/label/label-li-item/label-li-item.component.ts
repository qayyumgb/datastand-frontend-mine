import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Label } from '@app/interfaces';
import { AuthService, UrlsService } from '@app/services';
import {
  RenameDialogComponent,
  UpdateLabelDialogComponent,
  UpdateTagsDialogComponent,
} from '@pm/components';

@Component({
  selector: 'pm-label-li-item',
  templateUrl: './label-li-item.component.html',
})
export class LabelLiItemComponent {
  @Input() label?: Label;
  @Input() labelSetId?: number;
  @Input() isCreator?: boolean;
  // All these events emit the labelId.
  @Output() copyLabelEvent = new EventEmitter<number>();
  @Output() deleteLabelEvent = new EventEmitter<number>();
  @Output() setLabelStatusToPendingEvent = new EventEmitter<number>();
  @Output() setLabelStatusToReviewedEvent = new EventEmitter<number>();

  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    public urls: UrlsService
  ) {}

  openRenameLabelDialog(label: Label) {
    this.dialog.open(RenameDialogComponent, {
      data: { element: label, type: 'label' },
    });
  }

  openUpdateLabelDialog(label: Label) {
    this.dialog.open(UpdateLabelDialogComponent, { data: label });
  }

  openUpdateTagsDialog(label: Label) {
    this.dialog.open(UpdateTagsDialogComponent, {
      data: { element: label, type: 'label' },
    });
  }
}
