import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { selectTitle } from '@workbench/store/task-text';

import { updateTextTitle } from './update-name-dialog.actions';

@Component({
  selector: 'app-update-name-dialog',
  templateUrl: './update-name-dialog.component.html',
  styleUrls: ['../base-crud-dialog.scss'],
})
export class UpdateNameDialogComponent {
  form = this.fb.group({
    name: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(selectTitle)
      .subscribe((value) => this.form.controls['name'].setValue(value));
  }

  onSubmit(): void {
    this.store.dispatch(updateTextTitle({ name: this.form.value.name! }));
  }
}
