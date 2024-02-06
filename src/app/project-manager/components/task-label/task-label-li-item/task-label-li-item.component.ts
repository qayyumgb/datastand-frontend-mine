import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Label } from '@app/interfaces';
import { AuthService, LabelService, UrlsService } from '@app/services';
import {
  RenameDialogComponent,
  UpdateTagsDialogComponent,
  UpdateTaskLabelDialogComponent,
} from '@pm/components';

export interface IcopyTaskLabelEvent {
  taskLabel: Label;
  originalTaskLabelId: number;
}

@Component({
  selector: 'pm-task-label-li-item',
  templateUrl: './task-label-li-item.component.html',
})
export class TaskLabelLiItemComponent {
  @Input() taskLabel?: Label;
  @Input() taskId?: number;
  @Output() copyLabelEvent = new EventEmitter<IcopyTaskLabelEvent>(); // copied TaskLabel
  @Output() deleteLabelEvent = new EventEmitter<number>(); // labelId

  constructor(
    private auth: AuthService,
    private labelService: LabelService,
    private dialog: MatDialog,
    public urls: UrlsService
  ) {}

  copyLabel(taskLabel: Label) {
    this.labelService.copy(taskLabel.id!).subscribe((res: Label) =>
      this.copyLabelEvent.emit({
        originalTaskLabelId: taskLabel.id!,
        taskLabel: res,
      })
    );
  }

  deleteLabel(taskLabel: Label) {
    this.labelService.delete(taskLabel.id!).subscribe(() => {
      // We need to emit an event for the parent to update the count.
      this.deleteLabelEvent.emit(taskLabel?.id);
      this.taskLabel = undefined;
    });
  }

  isCreator(): boolean {
    return this.auth.username === this.taskLabel?.creator?.username;
  }

  markLabelAsPending(taskLabel: Label) {
    this.labelService
      .setAsPending(taskLabel.id!)
      .subscribe((res: Label) => (this.taskLabel = res));
  }

  markLabelAsReviewed(taskLabel: Label) {
    this.labelService
      .setAsReviewed(taskLabel.id!)
      .subscribe((res: Label) => (this.taskLabel = res));
  }

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
