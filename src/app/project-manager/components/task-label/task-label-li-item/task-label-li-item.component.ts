import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Label } from '@app/interfaces';
import { AuthService, UrlsService } from '@app/services';
import {
  RenameDialogComponent,
  UpdateTagsDialogComponent,
  UpdateTaskLabelDialogComponent,
} from '@pm/components';

@Component({
  selector: 'pm-task-label-li-item',
  templateUrl: './task-label-li-item.component.html',
})
export class TaskLabelLiItemComponent {
  @Input() taskLabel?: Label;
  @Input() taskId?: number;
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

  openRenameLabelDialog(taskLabel: Label) {
    this.dialog.open(RenameDialogComponent, {
      data: { element: taskLabel, type: 'task-label' },
    });
  }

  openUpdateLabelDialog(taskLabel: Label) {
    this.dialog.open(UpdateTaskLabelDialogComponent, {
      data: taskLabel,
    });
  }

  openUpdateTagsDialog(taskLabel: Label) {
    this.dialog.open(UpdateTagsDialogComponent, {
      data: { element: taskLabel, type: 'task-label' },
    });
  }
}
