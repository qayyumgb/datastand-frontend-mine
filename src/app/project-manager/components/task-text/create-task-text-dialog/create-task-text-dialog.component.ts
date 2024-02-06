import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Task, Text } from '@app/interfaces';
import { TextService } from '@app/services';

@Component({
  selector: 'pm-create-task-text-dialog',
  templateUrl: './create-task-text-dialog.component.html',
  styleUrls: [],
})
export class CreateTaskTextDialogComponent {
  @ViewChild('content', { read: ElementRef }) public content?: ElementRef<any>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private dialogRef: MatDialogRef<CreateTaskTextDialogComponent>,
    private snackbar: MatSnackBar,
    private textService: TextService
  ) {}

  onSubmit(taskText: Partial<Text>): void {
    this.textService
      .create({ ...taskText, content_type: 'task', object_id: this.data.id })
      .subscribe(() => {
        this.dialogRef.close(true);
        this.snackbar.open('✅ TaskText created successfully', 'Dismiss');
      });
  }
}
