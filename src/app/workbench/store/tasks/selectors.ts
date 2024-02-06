import { createSelector } from '@ngrx/store';
import prettyBytes from 'pretty-bytes';

import * as utils from '@workbench/utils';

import { selectAllComments } from '../comments/selectors';
import { selectRouteParams } from '../router.selectors';
import { selectAllSpans } from '../spans/selectors';
import { selectTextState } from '../task-text/selectors';
import { selectAllTokenLayers } from '../token-layers/selectors';
import { selectWorkbenchUiState } from '../workbench-ui/selectors';

export const selectTaskData = createSelector(
  selectAllSpans,
  selectAllComments,
  selectTextState,
  selectAllTokenLayers,
  selectWorkbenchUiState,
  (
    selectAllSpans,
    selectAllComments,
    selectTextState,
    selectAllTokenLayers,
    selectWorkbenchUiState
  ) => ({
    spans: selectAllSpans,
    comments: selectAllComments,
    text: selectTextState,
    tokenLayers: selectAllTokenLayers,
    workbenchUi: selectWorkbenchUiState,
  })
);

export const selectTaskDataByteSize = createSelector(selectTaskData, (data) =>
  utils.byteSize(data)
);

export const selectTaskDataPrettyBytes = createSelector(
  selectTaskDataByteSize,
  (bytes) => prettyBytes(bytes)
);

export const selectRoutedTaskId = createSelector(
  selectRouteParams,
  ({ taskId }) => taskId
);

export const selectRoutedTaskTextId = createSelector(
  selectRouteParams,
  ({ taskTextId }) => taskTextId
);
