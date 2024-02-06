import { CommentsState } from '@app/workbench/store/comments/reducer';
import { TaskTextState } from '@app/workbench/store/task-text/reducer';
import { TokenLayersState } from '@app/workbench/store/token-layers/reducer';
import { WorkbenchUiState } from '@app/workbench/store/workbench-ui/reducer';

export interface AppState {
  // Workbench states.
  comments: CommentsState;
  text: TaskTextState;
  tokenLayers: TokenLayersState;
  workbenchUi: WorkbenchUiState;
}
