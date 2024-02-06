import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CreateTaskDialogComponent } from '@pm/components';

@Component({
  selector: 'pm-my-task-list-header-card',
  templateUrl: './my-task-list-header-card.component.html',
})
export class MyTaskListHeaderCardComponent {
  constructor(private dialog: MatDialog) {}

  openCreateTaskDialog() {
    this.dialog.open(CreateTaskDialogComponent);
  }
}
