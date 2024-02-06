import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getLoadingSelectors } from '../shared/selectors';
import { CommentsState, adapter, commentsFeatureKey } from './reducer';

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();

export const getSelectedCommentId = (state: CommentsState) =>
  state.selectedCommentId;

export const selectCommentsState =
  createFeatureSelector<CommentsState>(commentsFeatureKey);

export const selectCommentsIds = createSelector(selectCommentsState, selectIds);

export const selectCommentsEntities = createSelector(
  selectCommentsState,
  selectEntities
);

export const selectAllComments = createSelector(selectCommentsState, selectAll);

export const selectCommentsTotal = createSelector(
  selectCommentsState,
  selectTotal
);

export const selectCurrentCommentId = createSelector(
  selectCommentsState,
  getSelectedCommentId
);

export const selectCurrentComment = createSelector(
  selectCommentsEntities,
  selectCurrentCommentId,
  (entities, selectedCommentId) => entities[selectedCommentId!]
);

export const isCommentSelected = createSelector(
  selectCurrentComment,
  (comment) => comment != null
);

export const {
  selectCallState: selectCommentsCallState,
  isLoading: isCommentsLoading,
  isLoaded: isCommentsLoaded,
} = getLoadingSelectors(selectCommentsState);
