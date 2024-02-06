import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Comment } from '@app/interfaces';
import { Store } from '@ngrx/store';
import { updateComment } from './update-comment-dialog.actions';

@Component({
  selector: 'app-update-comment-dialog',
  templateUrl: './update-comment-dialog.component.html',
  styleUrls: ['../base-crud-dialog.scss'],
})
export class UpdateCommentDialogComponent {
  form = this.fb.group({
    text: ['', Validators.required],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Comment,
    private fb: FormBuilder,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.form.controls['text'].setValue(this.data.text!);
  }

  onSubmit(): void {
    let comment: Partial<Comment> = { text: this.form.value.text! };
    this.store.dispatch(
      updateComment({ comment: { id: this.data.id, changes: comment } })
    );
  }
}
