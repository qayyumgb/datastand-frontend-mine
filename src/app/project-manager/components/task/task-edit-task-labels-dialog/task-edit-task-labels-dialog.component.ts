import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';

import { LabelSet } from '@app/interfaces';
import {
  AuthService,
  LabelSetService,
  TaskService,
  UrlsService,
} from '@app/services';

@Component({
  selector: 'pm-task-edit-task-labels-dialog',
  templateUrl:
    '../../label-set/label-set-edit-labels-dialog/label-set-edit-labels-dialog.component.html',
  styleUrls: [
    '../../base-import-other-dialog.scss',
    '../../base-crud-dialog.scss',
  ],
})
export class TaskEditTaskLabelsDialogComponent {
  searchForm = this.fb.group({
    search: ['', []],
  });
  labelSetOptions?: LabelSet[];
  addedLabelSets: LabelSet[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: LabelSet,
    private dialogRef: MatDialogRef<TaskEditTaskLabelsDialogComponent>,
    private auth: AuthService,
    private labelSetService: LabelSetService,
    private taskService: TaskService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public urls: UrlsService
  ) {
    // We need to call getLabelSets twice to display user's corpora first.
    forkJoin([
      this.labelSetService.list({
        creator: 'me',
        ordering: '-modified',
      }),
      this.labelSetService.list({ creator: 'others' }),
    ]).subscribe(([myLabelSets, othersLabelSets]) => {
      const allLabelSets = [...myLabelSets.results, ...othersLabelSets.results];
      this.labelSetOptions = this.filterOptions(allLabelSets);
    });
  }

  addLabelSet(labelSet: LabelSet) {
    this.addedLabelSets?.unshift(labelSet);
  }

  deleteLabelSet(labelSet: LabelSet) {
    this.addedLabelSets = this.addedLabelSets?.filter(
      (t) => t.id !== labelSet.id
    );
  }

  filterOptions(labelSets: LabelSet[]): LabelSet[] {
    // Remove empty corpora and the corpus itself.
    return labelSets.filter(
      (labelSet) => labelSet.num_labels! > 0 && labelSet.id !== this.data.id
    );
  }

  getLabelSetOptions(search: string): void {
    this.labelSetService
      .list({ search, limit: 200, ordering: 'name' })
      .subscribe(
        (res) => (this.labelSetOptions = this.filterOptions(res.results))
      );
  }

  isLabelSetCreator(labelSet: LabelSet) {
    return labelSet.creator?.username === this.auth.user?.username;
  }

  isLabelSetAdded(labelSet: LabelSet) {
    return this.addedLabelSets?.find((t) => t.id === labelSet.id);
  }

  onSave(): void {
    // Iterate over each corpus and call copyTextsFromCorpus from DataService.
    this.addedLabelSets?.forEach((labelSet) =>
      this.taskService
        .copyLabelsFrom(this.data.id, labelSet.id!)
        .subscribe(() => {
          this.dialogRef.close(true);
          this.snackBar.open(
            `✅ Label set #${labelSet.id} copied succesfully`,
            'Dismiss'
          );
        })
    );
  }

  onSearchFormSubmit(): void {
    if (this.searchForm.valid) {
      this.getLabelSetOptions(this.searchForm.value.search!);
    }
  }
}
