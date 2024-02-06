import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { TokenLayer } from '@workbench/interfaces';
import { selectCurrentTokenLayer } from '@workbench/store/token-layers';

import { updateTokenLayer } from './update-token-layer-dialog.actions';

@Component({
  selector: 'app-update-token-layer-dialog',
  templateUrl: './update-token-layer-dialog.component.html',
  styleUrls: ['../base-crud-dialog.scss'],
})
export class UpdateTokenLayerDialogComponent {
  form = this.fb.group({
    name: ['', Validators.required],
    description: [''],
  });

  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: { selected: number }
  ) {}

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' : '';
  }

  ngOnInit(): void {
    this.store.select(selectCurrentTokenLayer).subscribe((tokenLayer) => {
      if (tokenLayer) {
        this.form.controls['name'].setValue(tokenLayer.name!);
        this.form.controls['description'].setValue(tokenLayer?.description!);
      }
    });
  }

  onSubmit(): void {
    let tokenLayer: Partial<TokenLayer> = {
      id: this.data.selected,
      name: this.form.value.name!,
      description: this.form.value.description!,
    };
    this.store.dispatch(
      updateTokenLayer({ update: { id: tokenLayer.id!, changes: tokenLayer } })
    );
  }

  get name() {
    return this.form.controls['name'];
  }
}
