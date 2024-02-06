import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { CommentApiActions, CommentService } from '@app/services';
import {
  CommentsWindowActions,
  CreateCommentDialogActions,
  TopbarActions,
  UpdateCommentDialogActions,
  WorkbenchActions,
} from '@app/workbench/actions';
import { Store } from '@ngrx/store';

import { selectRoutedTaskTextId } from '../selectors';

@Injectable()
export class CommentEffects {
  addComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateCommentDialogActions.addComment),
      concatLatestFrom(() => this.store.select(selectRoutedTaskTextId)),
      exhaustMap(([action, taskTextId]) => {
        return this.commentService
          .create({
            ...action.comment,
            content_type: 'text',
            object_id: taskTextId,
          })
          .pipe(
            map((comment) => CommentApiActions.addCommentSuccess({ comment }))
          );
      })
    )
  );

  loadTaskData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkbenchActions.loadTaskData),
      exhaustMap((action) =>
        this.commentService.listFromTaskText(action.taskTextId).pipe(
          map((comments) => {
            return CommentApiActions.loadCommentsSuccess({ comments });
          })
        )
      )
    )
  );

  removeComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentsWindowActions.removeComment, TopbarActions.removeComment),
      exhaustMap(({ id }) => {
        return this.commentService.delete(id).pipe(
          map(() => CommentApiActions.removeCommentSuccess({ id })),
          catchError((error) =>
            of(CommentApiActions.removeCommentFailure({ error }))
          )
        );
      })
    )
  );

  updateComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateCommentDialogActions.updateComment),
      exhaustMap(({ comment }) =>
        this.commentService.patch(Number(comment.id), comment.changes).pipe(
          map(() => CommentApiActions.updateCommentSuccess({ comment })),
          catchError((error) =>
            of(CommentApiActions.updateCommentFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private commentService: CommentService,
    private store: Store
  ) {}
}
