import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActionCreator } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import {
  SpanApiActions,
  TextApiActions,
  TokenLayerApiActions,
} from '@app/services';
import {
  AnnotationsTabActions,
  SpanActions,
  SuggestionsWindowActions,
  TokenLayersWindowActions,
} from '@app/workbench/actions';

@Injectable()
export class SnackBarEffects {
  // Helper function to create a snackbar effect
  private createSnackBarEffect(actions: ActionCreator[], message: string) {
    return createEffect(
      () =>
        this.actions$.pipe(
          ofType(...actions),
          tap(() => this.snackBar.open(message, 'Dismiss'))
        ),
      { dispatch: false }
    );
  }

  acceptSuggestions$ = this.createSnackBarEffect(
    [
      AnnotationsTabActions.acceptSuggestions,
      SpanActions.acceptSuggestions,
      SuggestionsWindowActions.acceptSuggestions,
    ],
    '🤖 Accepting suggestions...'
  );

  acceptSuggestionsSuccess$ = this.createSnackBarEffect(
    [SpanApiActions.acceptSuggestionsSuccess],
    '✅ Suggestions accepted'
  );

  addBasicTokenLayers$ = this.createSnackBarEffect(
    [TokenLayersWindowActions.addBasicTokenLayers],
    '🤖 Adding basic token layers...'
  );

  addBasicTokenLayersSuccess$ = this.createSnackBarEffect(
    [TextApiActions.addBasicTokenLayersSuccess],
    '✅ Token layers added successfully'
  );

  addSpanFailure$ = this.createSnackBarEffect(
    [SpanApiActions.addSpanFailure],
    '❌ Failed to add Span'
  );

  addTokenBoundaryFailure$ = this.createSnackBarEffect(
    [TokenLayerApiActions.addTokenBoundaryFailure],
    '❌ Failed to add token boundary'
  );

  rejectSuggestions$ = this.createSnackBarEffect(
    [
      AnnotationsTabActions.rejectSuggestions,
      SpanActions.rejectSuggestions,
      SuggestionsWindowActions.rejectSuggestions,
    ],
    '🤖 Rejecting suggestions...'
  );

  rejectSuggestionsSuccess$ = this.createSnackBarEffect(
    [SpanApiActions.rejectSuggestionsSuccess],
    '❌ Suggestions rejected'
  );

  constructor(private actions$: Actions, private snackBar: MatSnackBar) {}
}
