import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Text } from '@app/interfaces';
import { StatusEnum } from '@app/interfaces/abstract';
import { AuthService, TextService, UrlsService } from '@app/services';
import {
  RenameDialogComponent,
  UpdateTagsDialogComponent,
  UpdateTaskTextDialogComponent,
  ViewTaskTextDialogComponent,
} from '@pm/components';

export interface IcopyTaskTextEvent {
  taskText: Text;
  originalTaskTextId: number;
}

@Component({
  selector: 'pm-task-text-li-item',
  templateUrl: './task-text-li-item.component.html',
  styleUrls: ['./task-text-li-item.component.scss'],
})
export class TaskTextLiItemComponent {
  @Input() taskText?: Text;
  @Input() taskId?: number;
  @Input() isSelected?: boolean = false;
  @Output() acceptSuggestionEvent = new EventEmitter<Text>();
  @Output() copyTaskTextEvent = new EventEmitter<IcopyTaskTextEvent>(); // copied TaskText
  @Output() deleteTaskTextEvent = new EventEmitter<number>(); // taskTextId
  @Output() selectTaskTextEvent = new EventEmitter<number>(); // textId
  @Output() deselectTaskTextEvent = new EventEmitter<number>(); // textId

  statusEnum = StatusEnum;

  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private textService: TextService,
    public urls: UrlsService
  ) {}

  copyTaskText(taskText: Text) {
    this.textService.copy(taskText.id!).subscribe((res) =>
      this.copyTaskTextEvent.emit({
        originalTaskTextId: taskText.id!,
        taskText: res,
      })
    );
  }

  acceptSuggestion(taskText: Text) {
    this.textService.setStatusToCompleted(taskText.id!).subscribe((res) => {
      this.acceptSuggestionEvent.emit(res);
      this.taskText = res;
      this.snackBar.open(`✅ Suggestion accepted`, 'Dismiss');
    });
  }

  deleteTaskText(taskText: Text) {
    this.textService.delete(taskText.id!).subscribe(() => {
      // We need to emit an event for the parent to update the count.
      this.deleteTaskTextEvent.emit(taskText?.id);
      this.taskText = undefined;
    });
  }

  isCreator(): boolean {
    return this.auth.username === this.taskText?.creator?.username;
  }

  setAsNotSeed(taskText: Text) {
    this.textService
      .setAsNotSeed(taskText.id!)
      .subscribe((res: Text) => (this.taskText = res));
  }

  setAsSeed(taskText: Text) {
    this.textService
      .setAsSeed(taskText.id!)
      .subscribe((res: Text) => (this.taskText = res));
  }

  setStatusToPending(taskText: Text) {
    this.textService
      .setStatusToPending(taskText.id!)
      .subscribe((res: Text) => (this.taskText = res));
  }

  setStatusToCompleted(taskText: Text) {
    this.textService
      .setStatusToCompleted(taskText.id!)
      .subscribe((res: Text) => (this.taskText = res));
  }

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
      this.selectTaskTextEvent.emit(this.taskText?.id!);
    } else {
      this.deselectTaskTextEvent.emit(this.taskText?.id!);
    }
  }
}
