import { createSelector } from '@ngrx/store';

import {
  selectCreated,
  selectLastModified,
  selectTaskDataPrettyBytes,
} from '@workbench/store/selectors';

export const selectFileDetailsDialogViewModel = createSelector(
  selectCreated,
  selectLastModified,
  selectTaskDataPrettyBytes,
  (created, lastModified, taskDataPrettyBytes) => ({
    created,
    lastModified,
    taskDataPrettyBytes,
  })
);
