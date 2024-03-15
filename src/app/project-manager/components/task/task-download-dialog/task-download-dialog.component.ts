import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { TaskService } from '@app/services';

@Component({
  selector: 'app-task-download-dialog',
  templateUrl: './task-download-dialog.component.html',
  styleUrls: [
    './task-download-dialog.component.scss',
    '../../base-crud-dialog.scss',
  ],
})
export class TaskDownloadDialogComponent {
  form = this.fb.group({
    taskFields: this.fb.group({
      created: true,
      creator: true,
      description: true,
      forked_from: true,
      image: true,
      is_public: true,
      langtag: true,
      modified: true,
      name: true,
      tags: true,
    }),
    labelFields: this.fb.group({
      author: true,
      created: true,
      date_published: true,
      description: true,
      id: true,
      is_pending: true,
      modified: true,
      name: true,
      value: true,
      status: true,
      raw_string: true,
      tags: true,
    }),
    textFields: this.fb.group({
      author: true,
      created: true,
      date_published: true,
      description: true,
      id: true,
      is_pending: true,
      langtag: true,
      modified: true,
      name: true,
      status: true,
      raw_string: true,
      tags: true,
    }),
  });

  get textFields() {
    return this.form.get('textFields') as FormGroup;
  }

  get taskFields() {
    return this.form.get('taskFields') as FormGroup;
  }

  get labelFields() {
    return this.form.get('labelFields') as FormGroup;
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskDownloadDialogComponent>,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: number // taskId
  ) {}

  hasSelectedFields(): boolean {
    return (
      this.taskFields.value.created! ||
      this.taskFields.value.creator! ||
      this.taskFields.value.description! ||
      this.taskFields.value.forked_from! ||
      this.taskFields.value.image! ||
      this.taskFields.value.is_public! ||
      this.taskFields.value.langtag! ||
      this.taskFields.value.modified! ||
      this.taskFields.value.name! ||
      this.taskFields.value.tags! ||
      this.labelFields.value.author! ||
      this.labelFields.value.created! ||
      this.labelFields.value.date_published! ||
      this.labelFields.value.description! ||
      this.labelFields.value.id! ||
      this.labelFields.value.is_pending! ||
      this.labelFields.value.modified! ||
      this.labelFields.value.name! ||
      this.labelFields.value.status! ||
      this.labelFields.value.raw_string! ||
      this.labelFields.value.tags! ||
      this.labelFields.value.value! ||
      this.textFields.value.author! ||
      this.textFields.value.created! ||
      this.textFields.value.date_published! ||
      this.textFields.value.description! ||
      this.textFields.value.id! ||
      this.textFields.value.is_pending! ||
      this.textFields.value.langtag! ||
      this.textFields.value.modified! ||
      this.textFields.value.name! ||
      this.textFields.value.status! ||
      this.textFields.value.raw_string! ||
      this.textFields.value.tags!
    );
  }

  onSubmit(): void {
    let taskFields = [];
    for (const [key, value] of Object.entries(this.taskFields.value)) {
      value ? taskFields.push(key) : null;
    }

    let labelFields = [];
    for (const [key, value] of Object.entries(this.labelFields.value)) {
      value ? labelFields.push(key) : null;
    }

    let textFields = [];
    for (const [key, value] of Object.entries(this.textFields.value)) {
      value ? textFields.push(key) : null;
    }

    // Pass "texts" if any text field is selected.
    if (textFields.length > 0) {
      taskFields.push('texts');
    }

    // Pass "labels" if any text field is selected.
    if (labelFields.length > 0) {
      taskFields.push('labels');
    }

    if (this.form.valid) {
      this.taskService.download(this.data, taskFields, textFields, labelFields);
      this.dialogRef.close(true);
    }
  }
}
