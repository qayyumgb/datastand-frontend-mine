import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Corpus } from '@app/interfaces';
import { AuthService, CorpusService, UrlsService } from '@app/services';
import {
  RenameDialogComponent,
  UpdateTagsDialogComponent,
} from '@pm/components';
import { isCreator } from '@pm/utils';

@Component({
  selector: 'pm-corpus-li-item',
  templateUrl: './corpus-li-item.component.html',
})
export class CorpusLiItemComponent implements OnInit {
  @Input() corpus?: Corpus;
  @Output() deleteCorpusEvent = new EventEmitter<number>(); // corpusId
  isCreator?: boolean;

  constructor(
    public auth: AuthService,
    private corpusService: CorpusService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    public urls: UrlsService
  ) {}

  ngOnInit(): void {
    this.isCreator = isCreator(this.corpus!, this.auth.username);
  }

  changeImage(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const image: File = event.target.files[0];
      this.corpusService
        .patchImage(this.corpus?.id!, image)
        .subscribe((res) => (this.corpus = res));
    }
  }

  copyCorpus() {
    this.corpusService.copy(this.corpus?.id!).subscribe((res: Corpus) => {
      this.router.navigateByUrl(this.urls.getCorpusUrl(res.id));
      this.snackBar.open('✅ Corpus copied succesfully', 'Dismiss');
    });
  }

  deleteCorpus() {
    this.corpusService.delete(this.corpus?.id!).subscribe(() => {
      // We need to emit an event for the parent to update the count.
      this.deleteCorpusEvent.emit(this.corpus?.id);
      delete this.corpus;
    });
  }

  forkCorpus() {
    this.corpusService.fork(this.corpus?.id!).subscribe((res: Corpus) => {
      this.router.navigateByUrl(this.urls.getCorpusUrl(res.id));
      this.snackBar.open('✅ Corpus forked succesfully', 'Dismiss');
    });
  }

  openRenameCorpusDialog() {
    this.dialog.open(RenameDialogComponent, {
      data: { element: this.corpus, type: 'corpus' },
    });
  }

  openUpdateTagsDialog() {
    this.dialog.open(UpdateTagsDialogComponent, {
      data: { element: this.corpus, type: 'corpus' },
    });
  }
}
