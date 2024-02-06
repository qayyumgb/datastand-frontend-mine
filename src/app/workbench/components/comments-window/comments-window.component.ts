import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import {
  CreateCommentDialogComponent,
  UpdateCommentDialogComponent,
} from '@workbench/components';

import { Comment } from '@app/interfaces';
import {
  closeCommentsWindow,
  removeComment,
  selectComment,
} from './comments-window.actions';
import { selectCommentsWindowModel } from './comments-window.selectors';

@Component({
  selector: 'app-comments',
  templateUrl: './comments-window.component.html',
  styleUrls: [
    '../window/window.component.scss',
    './comments-window.component.scss',
  ],
})
export class CommentsWindowComponent {
  title: string = 'Comments';
  width: string = '200px';
  top: string = 'calc(5% + 60px)';
  right: string = '5%';
  readonly vm$ = this.store.select(selectCommentsWindowModel);

  constructor(private dialog: MatDialog, private store: Store) {}

  closeWindow(): void {
    this.store.dispatch(closeCommentsWindow());
  }

  openCreateCommentDialog(): void {
    this.dialog.open(CreateCommentDialogComponent);
  }

  openUpdateCommentDialog(comment: Comment): void {
    this.dialog.open(UpdateCommentDialogComponent, { data: comment });
  }

  removeComment(id: number): void {
    this.store.dispatch(removeComment({ id }));
  }

  selectComment(id: number): void {
    this.store.dispatch(selectComment({ id }));
  }
}
