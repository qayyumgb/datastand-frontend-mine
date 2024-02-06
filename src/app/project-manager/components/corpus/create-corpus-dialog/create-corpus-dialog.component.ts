import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Corpus } from '@app/interfaces';
import { CorpusService, UrlsService } from '@app/services';

@Component({
  selector: 'pm-create-corpus-dialog',
  templateUrl: './create-corpus-dialog.component.html',
  styleUrls: [],
})
export class CreateCorpusDialogComponent {
  constructor(
    private corpusService: CorpusService,
    private router: Router,
    private urls: UrlsService
  ) {}

  onSubmit(corpus: Partial<Corpus>): void {
    this.corpusService
      .create(corpus)
      .subscribe((res) =>
        this.router.navigateByUrl(this.urls.getCorpusUrl(res.id))
      );
  }
}
