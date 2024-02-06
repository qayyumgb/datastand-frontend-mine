import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Corpus, Label, LabelSet, Task, Text } from '@app/interfaces';
import {
  CorpusService,
  LabelService,
  LabelSetService,
  TaskService,
  TextService,
} from '@app/services';

interface InputData {
  element: Corpus | Label | LabelSet | Task | Label | Text;
  type:
    | 'corpus'
    | 'label'
    | 'label-set'
    | 'task'
    | 'task-text'
    | 'task-label'
    | 'text';
}

@Component({
  selector: 'pm-rename-dialog',
  templateUrl: './rename-dialog.component.html',
  styleUrls: ['./rename-dialog.component.scss'],
})
export class RenameDialogComponent {
  form = this.fb.group({
    name: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private corpusService: CorpusService,
    private labelService: LabelService,
    private labelSetService: LabelSetService,
    private taskService: TaskService,
    private textService: TextService,
    @Inject(MAT_DIALOG_DATA) public data: InputData
  ) {
    this.form.controls['name'].setValue(data.element?.name!);
  }

  onSubmit() {
    if (this.form.valid) {
      let service: any;
      switch (this.data.type) {
        case 'corpus':
          service = this.corpusService;
          break;
        case 'label':
          service = this.labelService;
          break;
        case 'label-set':
          service = this.labelSetService;
          break;
        case 'task':
          service = this.taskService;
          break;
        case 'task-text':
          service = this.textService;
          break;
        case 'task-label':
          service = this.labelService;
          break;
        case 'text':
          service = this.textService;
          break;
      }
      service
        .rename(this.data.element.id, this.form.value.name)
        .subscribe(() => (this.data.element.name = this.form.value.name!));
    }
  }
}
