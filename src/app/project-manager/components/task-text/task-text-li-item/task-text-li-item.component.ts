import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Text } from '@app/interfaces';
import { StatusEnum } from '@app/interfaces/abstract';
import { UrlsService } from '@app/services';
import {
  RenameDialogComponent,
  UpdateTagsDialogComponent,
  UpdateTaskTextDialogComponent,
  ViewTaskTextDialogComponent,
} from '@pm/components';

@Component({
  selector: 'pm-task-text-li-item',
  templateUrl: './task-text-li-item.component.html',
  styleUrls: ['./task-text-li-item.component.scss'],
})
export class TaskTextLiItemComponent {
  @Input() taskText?: Text;
  @Input() taskId?: number;
  @Input() isSelected?: boolean = false;
  @Input() isCreator?: boolean;
  // All these events emit the textId.
  @Output() copyTextEvent = new EventEmitter<number>();
  @Output() deleteTextEvent = new EventEmitter<number>();
  @Output() deselectTextEvent = new EventEmitter<number>();
  @Output() selectTextEvent = new EventEmitter<number>();
  @Output() setTextAsNotSeedEvent = new EventEmitter<number>();
  @Output() setTextAsSeedEvent = new EventEmitter<number>();
  @Output() setTextStatusToPendingEvent = new EventEmitter<number>();
  @Output() setTextStatusToCompletedEvent = new EventEmitter<number>();

  statusEnum = StatusEnum;

  constructor(private dialog: MatDialog, public urls: UrlsService) {}

  openUpdateTaskTextDialog(taskText: Text) {
    this.dialog.open(UpdateTaskTextDialogComponent, {
      data: taskText,
    });
  }

  openRenameTaskTextDialog(taskText: Text) {
    this.dialog.open(RenameDialogComponent, {
      data: { element: taskText, type: 'task-text' },
    });
  }

  openUpdateTagsDialog(taskText: Text) {
    this.dialog.open(UpdateTagsDialogComponent, {
      data: { element: taskText, type: 'task-text' },
    });
  }

  openViewTaskTextDialog(taskText: Text) {
    this.dialog.open(ViewTaskTextDialogComponent, {
      data: taskText,
    });
  }

  toggleSelection() {
    this.isSelected = !this.isSelected;
    if (this.isSelected) {
      this.selectTextEvent.emit(this.taskText?.id!);
    } else {
      this.deselectTextEvent.emit(this.taskText?.id!);
    }
  }
}
