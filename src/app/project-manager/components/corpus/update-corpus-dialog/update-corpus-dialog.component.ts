import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Corpus } from '@app/interfaces';
import { CorpusService } from '@app/services';

@Component({
  selector: 'pm-update-corpus-dialog',
  templateUrl: './update-corpus-dialog.component.html',
  styleUrls: [],
})
export class UpdateCorpusDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Corpus,
    private corpusService: CorpusService
  ) {}

  onSubmit(corpus: Partial<Corpus>): void {
    this.corpusService.patch(this.data.id, corpus).subscribe((res: Corpus) => {
      // TODO(gustavoauma): Figure out why "this.data = res" doesn't work.
      // The frontend is only updated when modifying fields directly.
      this.data.description = res.description;
      this.data.modified = res.modified;
      this.data.langtag = res.langtag;
      this.data.name = res.name;
      this.data.tags = res.tags;
      this.data.is_public = res.is_public;
    });
  }
}
