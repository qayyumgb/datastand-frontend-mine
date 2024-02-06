import { LoadingState } from '@app/interfaces';
import { MemoizedSelector, createSelector } from '@ngrx/store';

export function getLoadingSelectors(stateSelector: MemoizedSelector<any, any>) {
  const selectCallState = createSelector(
    stateSelector,
    (state) => state.callState
  );

  const isInitializing = createSelector(
    selectCallState,
    (callState) => callState === LoadingState.INIT
  );

  const isLoading = createSelector(
    selectCallState,
    (callState) => callState === LoadingState.LOADING
  );

  const isLoaded = createSelector(
    selectCallState,
    (callState) => callState === LoadingState.LOADED
  );

  return {
    selectCallState,
    isInitializing,
    isLoading,
    isLoaded,
  };
}
