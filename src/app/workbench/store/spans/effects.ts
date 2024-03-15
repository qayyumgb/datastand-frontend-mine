import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store, createSelector } from '@ngrx/store';
import { exhaustMap, of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';

import { SpanApiActions, SpanService } from '@app/services';
import {
  AnnotationsTabActions,
  SpanActions,
  SuggestionsWindowActions,
  WorkbenchActions,
} from '@workbench/actions';
import { Span } from '@workbench/interfaces';

import { selectRouteParams } from '../router.selectors';
import { selectRoutedTaskTextId } from '../selectors';
import { selectAllLabels } from '../task-labels/selectors';
import { selectBody } from '../task-text';
import {
  selectCurrentAnnotatorId,
  selectRunAutomatically,
} from '../workbench-ui';
import { selectAllSpans } from './selectors';

// These selector are used only here and are intentionally not added to selectors.ts.
const selectAddSpanViewModel = createSelector(
  selectAllSpans,
  selectBody,
  selectRouteParams,
  (spans, text, routeParams) => ({ spans, text, routeParams })
);

const selectAddSpanSuccessViewModel = createSelector(
  selectCurrentAnnotatorId,
  selectRunAutomatically,
  (annotatorId, runAutomatically) => ({
    annotatorId,
    runAutomatically,
  })
);

const selectRunAnnotatorViewModel = createSelector(
  selectBody,
  selectAllSpans,
  selectAllLabels,
  (text, spans, labels) => ({
    text,
    spans,
    labels,
  })
);

interface AnnotateResponse {
  spans: Span[];
  error: string;
}

@Injectable()
export class SpanEffects {
  acceptSuggestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SpanActions.acceptSuggestion),
      exhaustMap((action) => {
        return this.spanService
          .acceptSuggestion(action.id)
          .pipe(
            map((response) =>
              SpanApiActions.acceptSuggestionSuccess({ span: response })
            )
          );
      })
    )
  );

  // Optimistically add the span to the store.
  addSpan$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnnotationsTabActions.addSpan),
      concatLatestFrom(() => this.store.select(selectAddSpanViewModel)),
      concatMap(([action, vm]) => {
        const text = vm.routeParams['taskTextId'];
        const value = vm.text.substring(action.span.start, action.span.end);
        return this.spanService.create({ ...action.span, value, text }).pipe(
          map((response) =>
            SpanApiActions.addSpanSuccess({
              span: { id: action.span.id, changes: response },
            })
          ),
          catchError((error) =>
            of(SpanApiActions.addSpanFailure({ id: action.span.id, error }))
          )
        );
      })
    )
  );

  // Add annotation suggestions if run annotator is selected.
  addSpanSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SpanApiActions.addSpanSuccess),
      concatLatestFrom(() => this.store.select(selectAddSpanSuccessViewModel)),
      map(([action, vm]) => {
        if (
          vm.runAutomatically &&
          vm.annotatorId &&
          vm.annotatorId !== '!off'
        ) {
          // Note: we use optimistic updates for Span. So `action.span.id` has only
          // a temporary id, the true id is in `action.span.changes.id`.
          return SuggestionsWindowActions.annotateSimilarSpans({
            id: Number(action.span.changes.id),
          });
        } else {
          // Effects always expect an action, so we have to return a no-op action here.
          return SpanApiActions.runAnnotatorNoOp();
        }
      })
    )
  );

  annotateSimilarSpans$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SuggestionsWindowActions.annotateSimilarSpans),
      exhaustMap((action) => {
        return this.spanService
          .annotateSimilar(action.id)
          .pipe(
            map((spans) =>
              SpanApiActions.annotateSimilarSpansSuccess({ spans })
            )
          );
      })
    )
  );

  loadTaskData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkbenchActions.loadTaskData),
      exhaustMap((action) =>
        this.spanService
          .listFromTaskText(action.taskTextId)
          .pipe(
            map((response) =>
              SpanApiActions.loadSpansSuccess({ spans: response })
            )
          )
      )
    )
  );

  refreshSpans$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SpanApiActions.refreshSpans),
      concatLatestFrom(() => this.store.select(selectRoutedTaskTextId)),
      exhaustMap(([action, taskTextId]) => {
        return this.spanService
          .listFromTaskText(taskTextId)
          .pipe(
            map((response) =>
              SpanApiActions.refreshSpansSuccess({ spans: response })
            )
          );
      })
    )
  );

  removeSpan$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SpanActions.removeSpan),
      exhaustMap((action) => {
        return this.spanService.delete(action.id).pipe(
          map(() => SpanApiActions.removeSpanSuccess({ id: action.id })),
          catchError((error) => {
            return of(SpanApiActions.removeSpanFailure({ error }));
          })
        );
      })
    )
  );

  // runAnnotator$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(
  //       AnnotationsTabActions.runAnnotator,
  //       SpanActions.runAnnotator,
  //       SuggestionsWindowActions.runAnnotator
  //     ),
  //     concatLatestFrom(() => this.store.select(selectRunAnnotatorViewModel)),
  //     switchMap(([action, vm]) => {
  //       this.snackBar.open('🤖 Running annotator...', 'Dismiss');
  //       var response: Observable<AnnotateResponse>;
  //       // Get the response from the relevant model.
  //       // TODO(gustavoauma): Stop hard-coding the model name.
  //       if (action.annotatorId == 'openai') {
  //         response = this.nlp.annotate(vm.text, action.annotatorId, vm.labels!);
  //       } else {
  //         response = this.nlp.annotateSimilarSpans(
  //           vm.text,
  //           action.annotatorId,
  //           vm.spans!
  //         );
  //       }
  //       return response.pipe(
  //         map(({ spans }) => {
  //           let suggestionSpans = utils.toSuggestionSpans(spans);
  //           // TODO(gustavoauma): Add the number of suggestions added.
  //           this.snackBar.open('🪄 Suggestions added', 'Dismiss');
  //           return SpanApiActions.runAnnotatorSuccess({
  //             spans: suggestionSpans,
  //           });
  //         })
  //       );
  //     })
  //   )
  // );

  // runAnnotator$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(
  //       AnnotationsTabActions.runAnnotator,
  //       SpanActions.runAnnotator,
  //       SuggestionsWindowActions.runAnnotator
  //     ),
  //     concatLatestFrom(() => this.store.select(selectRunAnnotatorViewModel)),
  //     switchMap(([action, vm]) => {
  //       this.snackBar.open('🤖 Running annotator...', 'Dismiss');
  //       var response: Observable<AnnotateResponse>;
  //       // Get the response from the relevant model.
  //       // TODO(gustavoauma): Stop hard-coding the model name.
  //       if (action.annotatorId == 'openai') {
  //         response = this.nlp.annotate(vm.text, action.annotatorId, vm.labels!);
  //       } else {
  //         response = this.nlp.annotateSimilarSpans(
  //           vm.text,
  //           action.annotatorId,
  //           vm.spans!
  //         );
  //       }
  //       return response.pipe(
  //         map(({ spans }) => {
  //           let suggestionSpans = utils.toSuggestionSpans(spans);
  //           // TODO(gustavoauma): Add the number of suggestions added.
  //           this.snackBar.open('🪄 Suggestions added', 'Dismiss');
  //           return SpanApiActions.runAnnotatorSuccess({
  //             spans: suggestionSpans,
  //           });
  //         })
  //       );
  //     })
  //   )
  // );

  constructor(
    private actions$: Actions,
    private snackBar: MatSnackBar,
    private store: Store,
    private spanService: SpanService
  ) {}
}
