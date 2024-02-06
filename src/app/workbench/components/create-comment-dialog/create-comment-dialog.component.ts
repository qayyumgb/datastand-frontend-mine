import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Comment } from '@app/interfaces';
import { addComment } from './create-comment-dialog.actions';

@Component({
  selector: 'app-create-comment-dialog',
  templateUrl: './create-comment-dialog.component.html',
  styleUrls: ['../base-crud-dialog.scss'],
})
export class CreateCommentDialogComponent {
  form = this.fb.group({
    text: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private store: Store) {}

  onSubmit(): void {
    if (this.form.valid) {
      const comment: Partial<Comment> = { text: this.form.value.text! };
      this.store.dispatch(addComment({ comment }));
    }
  }
}
