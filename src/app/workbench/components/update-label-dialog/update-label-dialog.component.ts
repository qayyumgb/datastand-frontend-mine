import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { validColorValidator } from 'ngx-colors';

import { Label } from '@app/interfaces';
import { selectCurrentLabel } from '@app/workbench/store/task-labels';
import * as utils from '@workbench/utils';

import { updateLabel } from './update-label-dialog.actions';

@Component({
  selector: 'app-update-label-dialog',
  templateUrl: './update-label-dialog.component.html',
  styleUrls: ['../base-crud-dialog.scss'],
})
export class UpdateLabelDialogComponent {
  form = this.fb.group({
    name: ['', Validators.required],
    value: ['', [Validators.required]],
    description: [''],
    examples: this.fb.array([this.fb.control('')]),
    color: [
      '#e1bee7',
      {
        updateOn: 'change',
        validators: [validColorValidator()],
        asyncValidators: [],
      },
    ],
    colorPicker: [
      '#e1bee7',
      { updateOn: 'change', validators: [], asyncValidators: [] },
    ],
  });
  labelColors = utils.labelColors;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA)
    public data: { labelId: number }
  ) {}

  addExample() {
    this.examples.push(this.fb.control(''));
  }

  deleteExample(exampleIndex: number) {
    this.examples.removeAt(exampleIndex);
  }

  get examples() {
    return this.form.get('examples') as FormArray;
  }

  ngOnInit(): void {
    this.form.controls['color'].valueChanges.subscribe((color) => {
      if (this.form.controls['colorPicker'].valid) {
        this.form.controls['colorPicker'].setValue(color, {
          emitEvent: false,
        });
      }
    });
    this.form.controls['colorPicker'].valueChanges.subscribe((color) =>
      this.form.controls['color'].setValue(color, {
        emitEvent: false,
      })
    );
    this.store.select(selectCurrentLabel).subscribe((label) => {
      if (label) {
        this.form.controls['name'].setValue(label.name!);
        this.form.controls['value'].setValue(label.value!);
        this.form.controls['description'].setValue(label.description!);
        this.form.controls['color'].setValue(label.color!);
        this.form.controls['colorPicker'].setValue(label.color!);
        this.form.controls['color'].setValue(label.color!);
        // Clear the array, otherwise we get an example with empty string.
        this.form.controls['examples'].clear();
        label.examples?.map((example) => {
          if (example != '') {
            this.examples.push(this.fb.control(example));
          }
        });
      }
    });
  }

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' : '';
  }

  onSubmit(): void {
    let label: Partial<Label> = {
      id: this.data.labelId,
      name: this.form.value.name!,
      value: this.form.value.value!,
      description: this.form.value.description!,
      color: this.form.value.color!,
      examples: this.examples.value,
    };
    this.store.dispatch(
      updateLabel({ label: { id: this.data.labelId, changes: label } })
    );
  }

  get name() {
    return this.form.controls['name'];
  }
}
