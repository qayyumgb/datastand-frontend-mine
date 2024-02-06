import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Corpus, User } from '@app/interfaces';
import { AuthService, CorpusService, UrlsService } from '@app/services';

@Component({
  selector: 'pm-corpus-news-feed-item',
  templateUrl: './corpus-news-feed-item.component.html',
  styleUrls: ['./corpus-news-feed-item.component.scss'],
})
export class CorpusNewsFeedItemComponent {
  @Input() corpus?: Corpus;
  @Input() user?: User;
  actions: boolean = false;

  constructor(
    public auth: AuthService,
    private corpusService: CorpusService,
    private router: Router,
    private snackBar: MatSnackBar,
    public urls: UrlsService
  ) {}

  displayActions() {
    this.actions = true;
  }

  forkCorpus() {
    this.corpusService.fork(this.corpus?.id!).subscribe((res: Corpus) => {
      this.router.navigateByUrl(this.urls.getCorpusUrl(res.id));
      this.snackBar.open('✅ Corpus forked succesfully', 'Dismiss');
    });
  }

  hideActions() {
    this.actions = false;
  }

  isCreator(): boolean {
    return this.auth.username === this.corpus?.creator?.username;
  }
}
