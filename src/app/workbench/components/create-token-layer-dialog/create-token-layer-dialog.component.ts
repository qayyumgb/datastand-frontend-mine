import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { TokenLayer } from '@workbench/interfaces';

import { addTokenLayer } from './create-token-layer-dialog.actions';

@Component({
  selector: 'app-create-token-layer-dialog',
  templateUrl: './create-token-layer-dialog.component.html',
  styleUrls: ['../base-crud-dialog.scss'],
})
export class CreateTokenLayerDialogComponent {
  form = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', []],
  });

  constructor(private fb: FormBuilder, private store: Store) {}

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' : '';
  }

  onSubmit(): void {
    let tokenLayer: Partial<TokenLayer> = {
      name: this.form.value.name!,
      description: this.form.value.description!,
    };
    this.store.dispatch(addTokenLayer({ tokenLayer }));
  }

  get name() {
    return this.form.controls['name'];
  }
}
