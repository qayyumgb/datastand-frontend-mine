import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Corpus, User } from '@app/interfaces';
import { AuthService, CorpusService, UrlsService } from '@app/services';
import { isCreator } from '@pm/utils';

@Component({
  selector: 'pm-corpus-news-feed-item',
  templateUrl: './corpus-news-feed-item.component.html',
  styleUrls: ['./corpus-news-feed-item.component.scss'],
})
export class CorpusNewsFeedItemComponent implements OnInit {
  @Input() corpus?: Corpus;
  @Input() user?: User;
  isCreator?: boolean;

  constructor(
    public auth: AuthService,
    private corpusService: CorpusService,
    private router: Router,
    private snackBar: MatSnackBar,
    public urls: UrlsService
  ) {}

  ngOnInit(): void {
    this.isCreator = isCreator(this.corpus!, this.auth.username);
  }

  forkCorpus() {
    this.corpusService.fork(this.corpus?.id!).subscribe((res: Corpus) => {
      this.router.navigateByUrl(this.urls.getCorpusUrl(res.id));
      this.snackBar.open('✅ Corpus forked succesfully', 'Dismiss');
    });
  }
}
