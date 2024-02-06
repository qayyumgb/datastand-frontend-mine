import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Task } from '@app/interfaces';
import { TaskService } from '@app/services';

@Component({
  selector: 'pm-update-task-dialog',
  templateUrl: './update-task-dialog.component.html',
  styleUrls: [],
})
export class UpdateTaskDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private taskService: TaskService
  ) {}

  onSubmit(corpus: Partial<Task>): void {
    this.taskService.patch(this.data.id, corpus).subscribe((res: Task) => {
      // TODO(gustavoauma): Figure out why "this.data = res" doesn't work.
      // The frontend is only updated when modifying fields directly.
      this.data.description = res.description;
      this.data.modified = res.modified;
      this.data.langtag = res.langtag;
      this.data.name = res.name;
      this.data.tags = res.tags;
    });
  }
}
