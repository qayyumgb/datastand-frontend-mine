import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { CorpusService } from '@app/services';

@Component({
  selector: 'app-corpus-download-dialog',
  templateUrl: './corpus-download-dialog.component.html',
  styleUrls: [
    './corpus-download-dialog.component.scss',
    '../../base-crud-dialog.scss',
  ],
})
export class CorpusDownloadDialogComponent {
  form = this.fb.group({
    corpusFields: this.fb.group({
      created: true,
      creator: true,
      description: true,
      forked_from: true,
      image: true,
      is_public: true,
      langtag: true,
      modified: true,
      name: true,
      num_upvotes: true,
      tags: true,
      upvoted_by: true,
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

  get corpusFields() {
    return this.form.get('corpusFields') as FormGroup;
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CorpusDownloadDialogComponent>,
    private corpusService: CorpusService,
    @Inject(MAT_DIALOG_DATA) public data: number // corpusId
  ) {}

  hasSelectedFields(): boolean {
    return (
      this.corpusFields.value.created! ||
      this.corpusFields.value.creator! ||
      this.corpusFields.value.description! ||
      this.corpusFields.value.forked_from! ||
      this.corpusFields.value.image! ||
      this.corpusFields.value.is_public! ||
      this.corpusFields.value.langtag! ||
      this.corpusFields.value.modified! ||
      this.corpusFields.value.name! ||
      this.corpusFields.value.num_upvotes! ||
      this.corpusFields.value.tags! ||
      this.corpusFields.value.upvoted_by! ||
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
    let corpusFields = [];
    for (const [key, value] of Object.entries(this.corpusFields.value)) {
      value ? corpusFields.push(key) : null;
    }

    let textFields = [];
    for (const [key, value] of Object.entries(this.textFields.value)) {
      value ? textFields.push(key) : null;
    }
    // Pass "texts" if any text field is selected.
    if (textFields.length > 0) {
      corpusFields.push('texts');
    }

    if (this.form.valid) {
      this.corpusService.download(this.data, corpusFields, textFields);
      this.dialogRef.close(true);
    }
  }
}
