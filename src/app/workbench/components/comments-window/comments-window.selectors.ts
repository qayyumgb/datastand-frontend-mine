import { createSelector } from '@ngrx/store';

import {
  getWindowComments,
  isCommentSelected,
  isCommentsLoaded,
  isCommentsLoading,
  selectAllComments,
  selectCurrentComment,
  selectCurrentCommentId,
} from '@workbench/store/selectors';

export const selectCommentsWindowModel = createSelector(
  isCommentSelected,
  isCommentsLoading,
  isCommentsLoaded,
  selectAllComments,
  selectCurrentComment,
  selectCurrentCommentId,
  getWindowComments,
  (
    isCommentSelected,
    isCommentsLoading,
    isCommentsLoaded,
    comments,
    currentComment,
    currentCommentId,
    window
  ) => ({
    isCommentSelected,
    isCommentsLoading,
    isCommentsLoaded,
    comments,
    currentComment,
    currentCommentId,
    window,
    // Derived
    canRemoveComment: isCommentSelected,
    canOpenUpdateCommentDialog: isCommentSelected,
  })
);
