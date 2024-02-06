import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { Comment } from '@app/interfaces';

export const addCommentSuccess = createAction(
  '[Comment API] Comment Added Succesfully',
  props<{ comment: Comment }>()
);

export const addCommentFailure = createAction(
  '[Comment API] Add Comment Failure',
  props<{ error: any }>()
);

export const loadCommentsSuccess = createAction(
  '[Comment API] Load Comments Success',
  props<{ comments: Comment[] }>()
);

export const loadCommentsFailure = createAction(
  '[Comment API] Load Comments Failure',
  props<{ error: any }>()
);

export const removeCommentSuccess = createAction(
  '[Comment API] Remove Comment Success',
  props<{ id: number }>()
);

export const removeCommentFailure = createAction(
  '[Comment API] Remove Comment Failure',
  props<{ error: any }>()
);

export const updateCommentSuccess = createAction(
  '[Comment API] Update Comment Success',
  props<{ comment: Update<Comment> }>()
);

export const updateCommentFailure = createAction(
  '[Comment API] Update Comment Failure',
  props<{ error: any }>()
);
