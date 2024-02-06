import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';

import { Corpus, Task } from '@app/interfaces';
import {
  AuthService,
  CorpusService,
  TaskService,
  UrlsService,
} from '@app/services';

@Component({
  selector: 'app-task-edit-task-texts-dialog',
  templateUrl:
    '../../corpus/corpus-edit-texts-dialog/corpus-edit-texts-dialog.component.html',
  styleUrls: [
    '../../base-import-other-dialog.scss',
    '../../base-crud-dialog.scss',
  ],
})
export class TaskEditTaskTextsDialogComponent {
  searchForm = this.fb.group({
    search: ['', []],
  });
  corpusOptions?: Corpus[];
  addedCorpora?: Corpus[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private dialogRef: MatDialogRef<TaskEditTaskTextsDialogComponent>,
    private auth: AuthService,
    private corpusService: CorpusService,
    private taskService: TaskService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public urls: UrlsService
  ) {
    this.addedCorpora = [];
    // We need to call getCorpora twice to display user's corpora first.
    forkJoin([
      this.corpusService.list({ creator: 'me', ordering: '-modified' }),
      this.corpusService.list({ creator: 'others' }),
    ]).subscribe(([myCorpora, othersCorpora]) => {
      const allCorpora = [...myCorpora.results, ...othersCorpora.results];
      this.corpusOptions = this.filterCorpusOptions(allCorpora);
    });
  }

  addCorpus(corpus: Corpus) {
    this.addedCorpora?.unshift(corpus);
  }

  deleteCorpus(corpus: Corpus) {
    this.addedCorpora = this.addedCorpora?.filter((t) => t.id !== corpus.id);
  }

  filterCorpusOptions(corpora: Corpus[]): Corpus[] {
    // Remove empty corpora and the corpus itself.
    return corpora.filter(
      (corpus) => corpus.num_texts! > 0 && corpus.id !== this.data.id
    );
  }

  getCorpusOptions(search: string): void {
    this.corpusService
      .list({ search, limit: 200, ordering: 'name' })
      .subscribe(
        (res) => (this.corpusOptions = this.filterCorpusOptions(res.results))
      );
  }

  isCorpusCreator(corpus: Corpus) {
    return corpus.creator?.username === this.auth.user?.username;
  }

  isCorpusAdded(corpus: Corpus) {
    return this.addedCorpora?.find((t) => t.id === corpus.id);
  }

  onSave(): void {
    // Iterate over each corpus and call copyTextsFromCorpus from DataService.
    this.addedCorpora?.forEach((corpus) => {
      this.taskService.copyTextsFrom(this.data.id, corpus.id!).subscribe(() => {
        this.dialogRef.close(true);
        this.snackBar.open(
          `✅ Corpus #${corpus.id} copied succesfully`,
          'Dismiss'
        );
      });
    });
  }

  onSearchFormSubmit(): void {
    if (this.searchForm.valid) {
      this.getCorpusOptions(this.searchForm.value.search!);
    }
  }
}
