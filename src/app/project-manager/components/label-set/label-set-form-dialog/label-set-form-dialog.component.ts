import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { LabelSet } from '@app/interfaces';
import { CorpusService } from '@app/services';

@Component({
  selector: 'pm-label-set-form-dialog',
  templateUrl: './label-set-form-dialog.component.html',
  styleUrls: ['../../base-crud-dialog.scss'],
})
export class LabelSetFormDialogComponent {
  @Input() title?: string;
  // labelSet is only required when updating a label set.
  @Input() labelSet?: LabelSet;
  @Output() submitEvent = new EventEmitter<Partial<LabelSet>>();

  form = this.fb.group({
    author: ['', []],
    description: ['', []],
    is_public: [false, [Validators.required]],
    name: ['', [Validators.required]],
    tags: [<string[]>[], []],
  });

  constructor(private corpusService: CorpusService, private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.labelSet) {
      this.form.controls['author'].setValue(this.labelSet.author!);
      this.form.controls['description'].setValue(this.labelSet.description!);
      this.form.controls['name'].setValue(this.labelSet.name!);
      this.form.controls['is_public'].setValue(this.labelSet.is_public!);
      // Use spread operator for tags, otherwise it edits LabelSet directly.
      this.form.controls['tags'].setValue([...this.labelSet.tags!]);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const labelSet: Partial<LabelSet> = {
        author: this.form.value.author!,
        description: this.form.value.description!,
        is_public: this.form.value.is_public!,
        name: this.form.value.name!,
        tags: this.form.value.tags!,
      };
      this.submitEvent.emit(labelSet);
    }
  }

  updateTags(tags: string[]): void {
    this.form.controls['tags'].setValue(tags);
  }
}
