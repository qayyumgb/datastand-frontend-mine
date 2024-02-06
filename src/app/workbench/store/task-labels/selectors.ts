import { Label } from '@app/interfaces';
import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { getLoadingSelectors } from '../shared/selectors';
import { TaskLabelsState, adapter, labelsFeatureKey } from './reducer';

export const selectTaskLabelsState =
  createFeatureSelector<TaskLabelsState>(labelsFeatureKey)!;

// TODO(gustavoauma): Refactor selectors to use the adapter here.
const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();

export const selectLabelEntities = createSelector(
  selectTaskLabelsState,
  (labelsState) => <Dictionary<Label>>labelsState?.entities
);

export const selectCurrentLabels = createSelector(
  selectLabelEntities,
  (entities) => entities && Object.values(entities)
);

export const selectAllLabels = createSelector(
  selectTaskLabelsState,
  (state) => state && selectAll(state)
);

export const selectLabelEntitiesTotal = createSelector(
  selectCurrentLabels,
  (entities) => entities && Object.keys(entities!).length
);

export const hasLabelEntities = createSelector(
  selectLabelEntitiesTotal,
  (labelEntitiesTotal) => labelEntitiesTotal > 0
);

export const selectCurrentLabelId = createSelector(
  selectTaskLabelsState,
  (labelsState) => labelsState?.selectedLabelId
);

export const selectCurrentLabelIndex = createSelector(
  selectCurrentLabels,
  selectCurrentLabelId,
  (labels, labelId) =>
    labels && labelId && labels.findIndex((l) => l?.id == labelId)
);

export const selectCurrentLabel = createSelector(
  selectLabelEntities,
  selectCurrentLabelId,
  (entities, labelId) => entities && labelId && entities[labelId]
);

export const selectCurrentLabelName = createSelector(
  selectCurrentLabel,
  (label) => label && label.name!
);

export const isLabelSelected = createSelector(
  selectCurrentLabelId,
  (labelId) => labelId != null
);

export const {
  selectCallState: selectLabelsCallState,
  isLoading: isLabelsLoading,
  isInitializing: isLabelsInitializing,
  isLoaded: isLabelsLoaded,
} = getLoadingSelectors(selectTaskLabelsState);
