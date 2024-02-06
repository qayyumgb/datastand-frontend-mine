import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { LabelApiActions, LabelService } from '@app/services';
import {
  CreateLabelDialogActions,
  LabelSetWindowActions,
  TopbarActions,
  UpdateLabelDialogActions,
  WorkbenchActions,
} from '@app/workbench/actions';

import { Store } from '@ngrx/store';
import { selectRoutedTaskId } from '../selectors';

@Injectable()
export class LabelEffects {
  addLabel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateLabelDialogActions.addLabel),
      concatLatestFrom(() => this.store.select(selectRoutedTaskId)),
      exhaustMap(([action, taskId]) => {
        return this.labelService
          .create({ ...action.label, content_type: 'task', object_id: taskId })
          .pipe(map((label) => LabelApiActions.addLabelSuccess({ label })));
      })
    )
  );

  loadTaskData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkbenchActions.loadTaskData),
      exhaustMap((action) =>
        this.labelService.listFromTask(action.taskId).pipe(
          map((response) => {
            return LabelApiActions.loadLabelsSuccess({
              labels: response.results,
            });
          })
        )
      )
    )
  );

  removeLabel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LabelSetWindowActions.removeLabel, TopbarActions.removeLabel),
      exhaustMap(({ id }) => {
        return this.labelService.delete(id).pipe(
          map(() => LabelApiActions.removeLabelSuccess({ id })),
          catchError((error) =>
            of(LabelApiActions.removeLabelFailure({ error }))
          )
        );
      })
    )
  );

  updateLabel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateLabelDialogActions.updateLabel),
      exhaustMap(({ label }) =>
        this.labelService.patch(Number(label.id), label.changes).pipe(
          map(() => LabelApiActions.updateLabelSuccess({ label })),
          catchError((error) =>
            of(LabelApiActions.updateLabelFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private labelService: LabelService,
    private store: Store
  ) {}
}
