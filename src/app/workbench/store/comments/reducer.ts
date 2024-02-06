import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { CallState, Comment, LoadingState } from '@app/interfaces';
import { CommentApiActions } from '@app/services';
import { CommentsWindowActions, WorkbenchActions } from '@workbench/actions';

export const commentsFeatureKey = 'comments';

export interface CommentsState extends EntityState<Comment> {
  selectedCommentId: number | null;
  callState: CallState;
}

export const adapter: EntityAdapter<Comment> = createEntityAdapter<Comment>();

export const initialCommentsState: CommentsState = adapter.getInitialState({
  selectedCommentId: null,
  callState: LoadingState.INIT,
});

export const commentsReducer = createReducer(
  initialCommentsState,
  // CommentApiActions
  on(CommentApiActions.addCommentSuccess, (state, action) =>
    adapter.addOne(action.comment, state)
  ),
  on(CommentApiActions.updateCommentSuccess, (state, action) =>
    adapter.updateOne(action.comment, state)
  ),
  on(CommentApiActions.removeCommentSuccess, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(CommentApiActions.loadCommentsSuccess, (state, action) =>
    adapter.setAll(action.comments, {
      ...state,
      selectedCommentId: null,
      callState: LoadingState.LOADED,
    })
  ),
  // WorkbenchActions
  on(WorkbenchActions.loadTaskData, (state) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  // CommentsWindowActions
  on(CommentsWindowActions.selectComment, (state, { id }) => ({
    ...state,
    selectedCommentId: id,
  }))
);
