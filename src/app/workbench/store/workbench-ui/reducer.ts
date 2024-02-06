import { createReducer, on } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';

import {
  CommentsWindowActions,
  LabelSetWindowActions,
  SuggestionsWindowActions,
  TokenLayersWindowActions,
  TokenizersWindowActions,
  TopbarActions,
  WorkbenchActions,
} from '@workbench/actions';

import { OFF_MODEL_ID } from '@app/constants';
import { LoadStatus } from '@app/workbench/enums';
import { WorkbenchWindows } from '@workbench/interfaces';

export const workbenchUiFeatureKey = 'workbenchUi';

export interface WorkbenchUiState {
  created: Date;
  lastModified: Date;
  status: LoadStatus;
  error: string | null;
  // Windows attributes
  selectedTabId: number;
  windows: WorkbenchWindows;
  // Annotators attributes
  selectedAnnotatorId: string | null;
  runAutomatically: boolean;
}
/**
 * Creates the initial workbench state.
 *
 * This is required to set the default values for the workbench state.
 * @returns WorkbenchUiState.
 */
function createInitialWorkbenchUiState(): WorkbenchUiState {
  const now = new Date();
  return {
    created: now,
    lastModified: now,
    error: null,
    status: LoadStatus.Pending,
    selectedTabId: 0, // Tokens tab
    windows: {
      labelSet: {
        top: '950px',
        left: '1420px',
        isVisible: false,
      },
      tokenLayers: {
        top: '305px',
        left: '1420px',
        isVisible: true,
      },
      tokenizers: {
        top: '750px',
        left: '1420px',
        isVisible: true,
      },
      comments: {
        top: '100px',
        left: '1420px',
        isVisible: true,
      },
      suggestions: {
        top: '500px',
        left: '1420px',
        isVisible: false,
      },
    },
    selectedAnnotatorId: OFF_MODEL_ID,
    runAutomatically: false,
  };
}

export const initialWorkbenchUiState: WorkbenchUiState =
  createInitialWorkbenchUiState();

export const workbenchUiReducer = createReducer(
  initialWorkbenchUiState,
  // BodyActions
  on(
    WorkbenchActions.selectTab,
    TopbarActions.resetWindows,
    (state, { id }) => {
      let newWindows = { ...state.windows };
      let windowsKey: keyof WorkbenchWindows;
      let visibleWindows: string[];
      switch (id) {
        // Tokens
        case 0: {
          visibleWindows = ['tokenLayers', 'comments', 'tokenizers'];
          break;
        }
        // Annotations
        case 1: {
          visibleWindows = [
            'tokenLayers',
            'labelSet',
            'comments',
            'suggestions',
          ];
          break;
        }
        // Legacy
        default: {
          visibleWindows = [];
          break;
        }
      }
      for (windowsKey in state.windows) {
        if (visibleWindows.includes(windowsKey as string)) {
          newWindows[windowsKey] = {
            ...newWindows[windowsKey],
            isVisible: true,
          };
        } else {
          newWindows[windowsKey] = {
            ...newWindows[windowsKey],
            isVisible: false,
          };
        }
      }
      return {
        ...state,
        selectedTabId: id,
        windows: newWindows,
      };
    }
  ),
  // CommentsWindowActions
  immerOn(CommentsWindowActions.closeCommentsWindow, (state) => {
    state.windows.comments.isVisible = false;
  }),
  // LabelSetWindowActions
  immerOn(LabelSetWindowActions.closeLabelSetWindow, (state) => {
    state.windows.labelSet.isVisible = false;
  }),
  // SuggestionsWindowActions
  immerOn(SuggestionsWindowActions.closeSuggestionsWindow, (state) => {
    state.windows.suggestions.isVisible = false;
  }),
  immerOn(SuggestionsWindowActions.selectAnnotator, (state, { id }) => {
    state.selectedAnnotatorId = id;
  }),
  immerOn(SuggestionsWindowActions.toggleRunAutomatically, (state) => {
    state.runAutomatically = !state.runAutomatically;
  }),
  // TokenizersWindowActions
  immerOn(TokenizersWindowActions.closeTokenizersWindow, (state) => {
    state.windows.tokenizers.isVisible = false;
  }),
  // TokenLayersWindowActions
  immerOn(TokenLayersWindowActions.closeTokenLayersWindow, (state) => {
    state.windows.tokenLayers.isVisible = false;
  }),
  // TopbarActions
  immerOn(TopbarActions.closeAllWindows, (state) => {
    state.windows.comments.isVisible = false;
    state.windows.labelSet.isVisible = false;
    state.windows.suggestions.isVisible = false;
    state.windows.tokenizers.isVisible = false;
    state.windows.tokenLayers.isVisible = false;
  }),
  immerOn(TopbarActions.toggleCommentsWindow, (state) => {
    state.windows.comments.isVisible = !state.windows.comments.isVisible;
  }),
  immerOn(TopbarActions.toggleLabelSetWindow, (state) => {
    state.windows.labelSet.isVisible = !state.windows.labelSet.isVisible;
  }),
  immerOn(TopbarActions.toggleSuggestionsWindow, (state) => {
    state.windows.suggestions.isVisible = !state.windows.suggestions.isVisible;
  }),
  immerOn(TopbarActions.toggleTokenizersWindow, (state) => {
    state.windows.tokenizers.isVisible = !state.windows.tokenizers.isVisible;
  }),
  immerOn(TopbarActions.toggleTokenLayersWindow, (state) => {
    state.windows.tokenLayers.isVisible = !state.windows.tokenLayers.isVisible;
  })
);
