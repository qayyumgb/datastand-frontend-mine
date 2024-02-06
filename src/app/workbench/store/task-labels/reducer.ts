import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { CallState, Label, LoadingState } from '@app/interfaces';
import { LabelApiActions } from '@app/services';
import {
  AnnotationsTabActions,
  LabelSetWindowActions,
  WorkbenchActions,
} from '@workbench/actions';

export const labelsFeatureKey = 'labels';

export interface State extends EntityState<Label> {
  selectedLabelId: number | null;
  callState: CallState;
}

export const adapter: EntityAdapter<Label> = createEntityAdapter<Label>();

export const initialState: State = adapter.getInitialState({
  selectedLabelId: null,
  callState: LoadingState.INIT,
});

export const labelsReducer = createReducer(
  initialState,
  // LabelApiActions
  on(LabelApiActions.addLabelSuccess, (state, action) =>
    adapter.addOne(action.label, state)
  ),
  on(LabelApiActions.updateLabelSuccess, (state, action) =>
    adapter.updateOne(action.label, state)
  ),
  on(LabelApiActions.removeLabelSuccess, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(LabelApiActions.loadLabelsSuccess, (state, action) =>
    adapter.setAll(action.labels, {
      ...state,
      // Keep the selection when navigating to a new taskText.
      selectedLabelId: state.selectedLabelId!,
      callState: LoadingState.LOADED,
    })
  ),
  // AnnotationsTabActions
  on(AnnotationsTabActions.selectLabelFromKeyboard, (state, { labelIndex }) => {
    // Note: labelId is necessarily a string, but TypeScript doesn't know that.
    const labelId: number = Number(Object.keys(state.entities!)[labelIndex]);
    return { ...state, selectedLabelId: labelId };
  }),
  // WorkbenchActions
  on(WorkbenchActions.loadTaskData, (state) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  // LabelSetWindowActions
  on(LabelSetWindowActions.selectLabel, (state, { labelId }) => ({
    ...state,
    selectedLabelId: labelId,
  }))
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
export interface TaskLabelsState extends EntityState<Label> {
  // additional entities state properties
  selectedLabelId: number | null;
}
