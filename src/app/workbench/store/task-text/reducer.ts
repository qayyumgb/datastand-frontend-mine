import { createReducer, on } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';

import { CallState, LoadingState, Text } from '@app/interfaces';
import { TextApiActions } from '@app/services';
import {
  TopbarActions,
  UpdateNameDialogActions,
  WorkbenchActions,
} from '@workbench/actions';

export const textFeatureKey = 'text';

export interface TaskTextState extends Text {
  callState: CallState;
}

export const initialTextState: TaskTextState = {
  id: -1,
  langtag: '',
  name: 'Untitled text',
  raw_string: '',
  object_id: -1,
  callState: LoadingState.INIT,
};

export const textReducer = createReducer(
  initialTextState,
  // TextTabActions & TopbarActions
  immerOn(TopbarActions.uploadTextBody, (state, { raw_string }) => {
    state.raw_string = raw_string;
  }),
  // TopbarActions
  immerOn(TopbarActions.clearTextBody, TopbarActions.clearTask, (state) => {
    state.raw_string = '';
  }),
  // UpdateNameDialogActions
  immerOn(UpdateNameDialogActions.updateTextTitle, (state, { name: name }) => {
    state.name = name;
  }),
  // TaskTextApiActions
  on(TextApiActions.loadTextSuccess, (state, { taskText }) => ({
    ...state,
    ...taskText,
    callState: LoadingState.LOADED,
  })),
  // Clear the store when loading new data.
  on(WorkbenchActions.loadTaskData, () => ({
    ...initialTextState,
    callState: LoadingState.LOADING,
  }))
);
