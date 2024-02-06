import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { validColorValidator } from 'ngx-colors';

import { Label } from '@app/interfaces';
import * as utils from '@workbench/utils';

import { addLabel } from './create-label-dialog.actions';

@Component({
  selector: 'app-create-label-dialog',
  templateUrl: './create-label-dialog.component.html',
  styleUrls: [
    '../base-crud-dialog.scss',
    './create-label-dialog.component.scss',
  ],
})
export class CreateLabelDialogComponent implements OnInit {
  form = this.fb.group({
    name: ['', [Validators.required]],
    value: ['', [Validators.required]],
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
    description: ['', []],
    examples: this.fb.array([this.fb.control('')]),
  });
  labelColors = utils.labelColors;
  valueOptions: string[] = [];

  constructor(private fb: FormBuilder, private store: Store) {}

  updateAutocomplete() {
    this.valueOptions = [this.form.value.name?.toUpperCase()!];
  }

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
  }

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' : '';
  }

  onSubmit(): void {
    const nonEmptyExamples = this.examples.value.filter((example: string) => {
      return example != '';
    });
    if (this.form.valid) {
      const label: Partial<Label> = {
        // TODO(gustavoauma): Implement these fields
        // author: this.form.value.author!,
        // tags: this.form.value.tags!,
        color: this.form.value.color!,
        description: this.form.value.description!,
        examples: nonEmptyExamples!,
        name: this.form.value.name!,
        value: this.form.value.value!,
      };
      this.store.dispatch(addLabel({ label }));
    }
  }

  get name() {
    return this.form.controls['name'];
  }
}
