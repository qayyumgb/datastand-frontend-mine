import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { TokenLayerApiActions, TokenLayerService } from '@app/services';
import {
  CharActions,
  ClearAllTokensDialogActions,
  CreateTokenLayerDialogActions,
  TokenLayersWindowActions,
  TokenizersWindowActions,
  TopbarActions,
  WorkbenchActions,
} from '@workbench/actions';

import { selectRoutedTaskTextId } from '../selectors';

@Injectable()
export class TokenLayersEffects {
  // Use optimistic update for addTokenBoundary.
  addTokenBoundary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharActions.addTokenBoundary),
      exhaustMap((action) =>
        this.tokenLayerService
          .addBoundary(action.tokenLayerId, action.boundary)
          .pipe(
            map((response) =>
              TokenLayerApiActions.addTokenBoundarySuccess({
                tokenLayer: { id: response.id, changes: response },
              })
            ),
            catchError((error) =>
              of(
                TokenLayerApiActions.addTokenBoundaryFailure({
                  tokenLayerId: action.tokenLayerId,
                  boundary: action.boundary,
                  error,
                })
              )
            )
          )
      )
    )
  );

  addTokenLayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateTokenLayerDialogActions.addTokenLayer),
      concatLatestFrom(() => this.store.select(selectRoutedTaskTextId)),
      exhaustMap(([action, taskTextId]) =>
        this.tokenLayerService
          .create({ ...action.tokenLayer, text: taskTextId })
          .pipe(
            map((tokenLayer) =>
              TokenLayerApiActions.addTokenLayerSuccess({ tokenLayer })
            ),
            catchError((error) => {
              return of(TokenLayerApiActions.addTokenLayerFailure({ error }));
            })
          )
      )
    )
  );

  loadTaskData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkbenchActions.loadTaskData),
      exhaustMap((action) =>
        this.tokenLayerService.listFromTaskText(action.taskTextId).pipe(
          map((response) =>
            TokenLayerApiActions.loadTokenLayersSuccess({
              tokenLayers: response,
            })
          )
        )
      )
    )
  );

  /**
   * Emit an action to add basic token layers when the TaskText is loaded.
   */
  // TODO(gustavoauma): Maybe reenable this.
  // loadTaskTextSuccess$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(TaskTextApiActions.loadTaskTextSuccess),
  //     map(() => TokenLayersWindowActions.addBasicTokenLayers())
  //   )
  // );

  removeAllTokenBoundaries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClearAllTokensDialogActions.removeAllTokenBoundaries),
      exhaustMap((action) =>
        this.tokenLayerService.removeAllBoundaries(action.tokenLayerId).pipe(
          map((response) =>
            TokenLayerApiActions.removeAllTokenBoundariesSuccess({
              tokenLayer: { id: response.id, changes: response },
            })
          )
        )
      )
    )
  );

  removeTokenBoundary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharActions.removeTokenBoundary),
      exhaustMap((action) =>
        this.tokenLayerService
          .removeBoundary(action.tokenLayerId, action.boundary)
          .pipe(
            map((response) =>
              TokenLayerApiActions.removeTokenBoundarySuccess({
                tokenLayer: { id: response.id, changes: response },
              })
            )
          )
      )
    )
  );

  removeTokenLayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        TokenLayersWindowActions.removeTokenLayer,
        TopbarActions.removeTokenLayer
      ),
      exhaustMap(({ id }) =>
        this.tokenLayerService.delete(id).pipe(
          map(() => TokenLayerApiActions.removeTokenLayerSuccess({ id })),
          catchError((error) =>
            of(TokenLayerApiActions.removeTokenLayerFailure({ error }))
          )
        )
      )
    )
  );

  runTokenizer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TokenizersWindowActions.runTokenizer),
      exhaustMap((action) =>
        this.tokenLayerService
          .tokenize(action.tokenLayerId, action.model, action.keepExisting)
          .pipe(
            map((response) =>
              TokenLayerApiActions.runTokenizerSuccess({
                tokenLayer: { id: response.id, changes: response },
              })
            )
          )
      )
    )
  );

  updateTokenLayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TokenLayersWindowActions.updateTokenLayer),
      exhaustMap(({ tokenLayer }) =>
        this.tokenLayerService
          .patch(Number(tokenLayer.id), tokenLayer.changes)
          .pipe(
            map(() =>
              TokenLayerApiActions.updateTokenLayerSuccess({ tokenLayer })
            ),
            catchError((error) =>
              of(TokenLayerApiActions.updateTokenLayerFailure({ error }))
            )
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private tokenLayerService: TokenLayerService,
    private store: Store
  ) {}
}
