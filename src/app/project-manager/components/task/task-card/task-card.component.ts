import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Task } from '@app/interfaces';
import { AuthService, TaskService, UrlsService } from '@app/services';
import {
  RenameDialogComponent,
  UpdateTagsDialogComponent,
} from '@pm/components';
import { isCreator, truncate } from '@pm/utils';

@Component({
  selector: 'pm-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['../../data-card.scss', '../../change-image-button.scss'],
})
export class TaskCardComponent implements OnInit {
  @Input() task?: Task;
  @Output() deleteTaskEvent = new EventEmitter<number>(); // taskId
  isCreator?: boolean;
  truncate = truncate;

  constructor(
    public auth: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private taskService: TaskService,
    public urls: UrlsService
  ) {}

  ngOnInit(): void {
    this.isCreator = isCreator(this.task!, this.auth.user?.username);
  }

  changeImage(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const image: File = event.target.files[0];
      this.taskService
        .patchImage(this.task?.id!, image)
        .subscribe((res) => (this.task = res));
    }
  }

  deleteTask() {
    this.taskService.delete(this.task?.id!).subscribe(() => {
      // We need to emit an event for the parent to update the count.
      this.deleteTaskEvent.emit(this.task?.id);
      delete this.task;
    });
  }

  openRenameTaskDialog() {
    this.dialog.open(RenameDialogComponent, {
      data: { element: this.task, type: 'task' },
    });
  }

  openUpdateTagsDialog() {
    this.dialog.open(UpdateTagsDialogComponent, {
      data: { element: this.task, type: 'task' },
    });
  }
}
