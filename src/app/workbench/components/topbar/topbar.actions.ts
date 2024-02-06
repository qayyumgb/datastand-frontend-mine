import { createAction, props } from '@ngrx/store';

export const clearTask = createAction('[Topbar Component] Task cleared');

export const clearTextBody = createAction(
  '[Topbar Component] Text Body cleared'
);

export const removeComment = createAction(
  '[Topbar Component] Remove Comment',
  props<{ id: number }>()
);

export const closeAllWindows = createAction(
  '[Topbar Component] All Windows Closed'
);

export const resetWindows = createAction(
  '[Topbar Component] Windows Reset To Default',
  props<{ id: number }>() // selectedTabId
);

export const uploadTextBody = createAction(
  '[Topbar Component] Text Body Uploaded',
  props<{ raw_string: string }>()
);

export const removeLabel = createAction(
  '[Topbar Component] Remove Label',
  props<{ id: number }>()
);

export const removeTokenLayer = createAction(
  '[Topbar Component] Remove TokenLayer',
  props<{ id: number }>()
);

export const toggleCommentsWindow = createAction(
  '[Topbar Component] Comments Visibility Toggled'
);

export const toggleLabelSetWindow = createAction(
  '[Topbar Component] LabelSet Visibility Toggled'
);

export const toggleSuggestionsWindow = createAction(
  '[Topbar Component] Suggestions Visibility Toggled'
);

export const toggleTokenizersWindow = createAction(
  '[Topbar Component] Tokenizers Visibility Toggled'
);

export const toggleTokenLayersWindow = createAction(
  '[Topbar Component] TokenLayers Visibility Toggled'
);
