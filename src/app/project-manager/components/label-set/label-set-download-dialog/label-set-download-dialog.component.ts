import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { LabelSetService } from '@app/services';

@Component({
  selector: 'app-label-set-download-dialog',
  templateUrl: './label-set-download-dialog.component.html',
  styleUrls: [
    './label-set-download-dialog.component.scss',
    '../../base-crud-dialog.scss',
  ],
})
export class LabelSetDownloadDialogComponent {
  form = this.fb.group({
    labelSetFields: this.fb.group({
      created: true,
      creator: true,
      description: true,
      forked_from: true,
      image: true,
      is_public: true,
      modified: true,
      name: true,
      num_upvotes: true,
      tags: true,
      upvoted_by: true,
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
  });

  get labelFields() {
    return this.form.get('labelFields') as FormGroup;
  }

  get labelSetFields() {
    return this.form.get('labelSetFields') as FormGroup;
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LabelSetDownloadDialogComponent>,
    private labelSetService: LabelSetService,
    @Inject(MAT_DIALOG_DATA) public data: number // labelSetId
  ) {}

  hasSelectedFields(): boolean {
    return (
      this.labelSetFields.value.created! ||
      this.labelSetFields.value.creator! ||
      this.labelSetFields.value.description! ||
      this.labelSetFields.value.forked_from! ||
      this.labelSetFields.value.image! ||
      this.labelSetFields.value.is_public! ||
      this.labelSetFields.value.modified! ||
      this.labelSetFields.value.name! ||
      this.labelSetFields.value.num_upvotes! ||
      this.labelSetFields.value.tags! ||
      this.labelSetFields.value.upvoted_by! ||
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
      this.labelFields.value.value!
    );
  }

  onSubmit(): void {
    let labelSetFields = [];
    for (const [key, value] of Object.entries(this.labelSetFields.value)) {
      value ? labelSetFields.push(key) : null;
    }

    let labelFields = [];
    for (const [key, value] of Object.entries(this.labelFields.value)) {
      value ? labelFields.push(key) : null;
    }
    // Pass "labels" if any text field is selected.
    if (labelFields.length > 0) {
      labelSetFields.push('labels');
    }

    if (this.form.valid) {
      this.labelSetService.download(this.data, labelSetFields, labelFields);
      this.dialogRef.close(true);
    }
  }
}
