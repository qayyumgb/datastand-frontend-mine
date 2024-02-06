import { Injectable } from '@angular/core';
import { TextApiActions, TextService } from '@app/services';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { WorkbenchActions } from '@workbench/actions';
import { exhaustMap, map, switchMap } from 'rxjs/operators';

import { SpanApiActions } from '@app/services';
import {
  AnnotationsTabActions,
  SpanActions,
  SuggestionsWindowActions,
  TokenLayersWindowActions,
} from '@workbench/actions';

import { selectRoutedTaskTextId } from '../selectors';

@Injectable()
export class TaskTextEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private textService: TextService
  ) {}

  acceptSuggestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AnnotationsTabActions.acceptSuggestions,
        SpanActions.acceptSuggestions,
        SuggestionsWindowActions.acceptSuggestions
      ),
      concatLatestFrom(() => this.store.select(selectRoutedTaskTextId)),
      exhaustMap(([action, taskTextId]) => {
        return this.textService
          .acceptSpanSuggestions(taskTextId)
          .pipe(map(() => SpanApiActions.refreshSpans()));
      })
    )
  );

  addBasicTokenLayers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TokenLayersWindowActions.addBasicTokenLayers),
      concatLatestFrom(() => this.store.select(selectRoutedTaskTextId)),
      switchMap(([action, taskTextId]) => {
        return this.textService
          .addBasicTokenLayers(taskTextId)
          .pipe(
            map((tokenLayers) =>
              TextApiActions.addBasicTokenLayersSuccess({ tokenLayers })
            )
          );
      })
    )
  );

  loadTaskData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkbenchActions.loadTaskData),
      exhaustMap((action) =>
        this.textService
          .retrieve(action.taskTextId)
          .pipe(map((taskText) => TextApiActions.loadTextSuccess({ taskText })))
      )
    )
  );

  rejectSuggestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AnnotationsTabActions.rejectSuggestions,
        SpanActions.rejectSuggestions,
        SuggestionsWindowActions.rejectSuggestions
      ),
      concatLatestFrom(() => this.store.select(selectRoutedTaskTextId)),
      exhaustMap(([action, taskTextId]) => {
        return this.textService
          .rejectSpanSuggestions(taskTextId)
          .pipe(map(() => SpanApiActions.refreshSpans()));
      })
    )
  );
}
