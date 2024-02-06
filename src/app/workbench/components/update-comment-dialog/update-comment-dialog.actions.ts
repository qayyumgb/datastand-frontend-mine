import { Comment } from '@app/interfaces';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

export const updateComment = createAction(
  '[Comment Dialog] Update Comment',
  props<{ comment: Update<Comment> }>()
);
