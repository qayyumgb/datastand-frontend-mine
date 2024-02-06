import { createAction, props } from '@ngrx/store';

import { Comment } from '@app/interfaces';

export const addComment = createAction(
  '[CreateCommentDialog] Add Comment',
  props<{ comment: Partial<Comment> }>()
);
