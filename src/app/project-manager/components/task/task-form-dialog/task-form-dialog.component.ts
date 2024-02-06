import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { LangTag, Task } from '@app/interfaces';
import { LangTagService } from '@app/services';

@Component({
  selector: 'pm-task-form-dialog',
  templateUrl: './task-form-dialog.component.html',
  styleUrls: ['../../base-crud-dialog.scss'],
})
export class TaskFormDialogComponent {
  @Input() title?: string;
  // task is only required when updating a label set.
  @Input() task?: Task;
  @Output() submitEvent = new EventEmitter<Partial<Task>>();

  form = this.fb.group({
    description: ['', []],
    is_public: [false, [Validators.required]],
    langtag: ['', [Validators.required]],
    name: ['', [Validators.required]],
    tags: [<string[]>[], []],
  });
  langtagOptions?: LangTag[];

  constructor(
    private fb: FormBuilder,
    private langTagService: LangTagService
  ) {}

  ngOnInit(): void {
    if (this.task) {
      this.form.controls['description'].setValue(this.task.description!);
      this.form.controls['langtag'].setValue(this.task.langtag!);
      this.form.controls['name'].setValue(this.task.name);
      // Use spread operator for tags, otherwise it edits Text directly.
      this.form.controls['tags'].setValue([...this.task.tags!]);
    }
    this.langTagService
      .getLangTags()
      .subscribe((res) => (this.langtagOptions = res));
  }

  onSubmit(): void {
    if (this.form.valid) {
      const task: Partial<Task> = {
        description: this.form.value.description!,
        langtag: this.form.value.langtag!,
        name: this.form.value.name!,
        tags: this.form.value.tags!,
      };
      this.submitEvent.emit(task);
    }
  }

  updateTags(tags: string[]): void {
    this.form.controls['tags'].setValue(tags);
  }
}
