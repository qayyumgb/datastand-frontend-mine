import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Corpus } from '@app/interfaces';
import { AuthService, CorpusService, UrlsService } from '@app/services';
import {
  CorpusDownloadDialogComponent,
  UpdateCorpusDialogComponent,
} from '@pm/components';

@Component({
  selector: 'pm-corpus-details-header-card',
  templateUrl: './corpus-details-header-card.component.html',
  styleUrls: ['../../change-image-button.scss'],
})
export class CorpusDetailsHeaderCardComponent implements OnInit {
  @Input() corpus?: Corpus;
  isCreator?: boolean;

  constructor(
    private auth: AuthService,
    private corpusService: CorpusService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    public urls: UrlsService
  ) {}

  ngOnInit(): void {
    this.isCreator = this.corpus?.creator?.username === this.auth.username;
  }

  changeImage(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const image: File = event.target.files[0];
      this.corpusService
        .patchImage(this.corpus?.id!, image)
        .subscribe((res) => (this.corpus = res));
    }
  }

  deleteCorpus() {
    this.corpusService
      .delete(this.corpus?.id!)
      .subscribe(() => this.router.navigateByUrl(this.urls.CORPORA_URL));
  }

  download() {
    return this.corpusService.download(this.corpus?.id!);
  }

  forkCorpus() {
    this.corpusService.fork(this.corpus?.id!).subscribe((res: Corpus) => {
      this.router.navigateByUrl(this.urls.getCorpusUrl(res.id));
      this.snackBar.open('✅ Corpus forked succesfully', 'Dismiss');
    });
  }

  openCorpusDownloadDialog() {
    this.dialog.open(CorpusDownloadDialogComponent, { data: this.corpus?.id });
  }

  openUpdateCorpusDialog() {
    this.dialog.open(UpdateCorpusDialogComponent, {
      data: this.corpus,
    });
  }
}
