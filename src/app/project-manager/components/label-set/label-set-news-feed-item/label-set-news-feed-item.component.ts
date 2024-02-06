import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { LabelSet, User } from '@app/interfaces';
import { AuthService, LabelSetService, UrlsService } from '@app/services';

@Component({
  selector: 'pm-label-set-news-feed-item',
  templateUrl: './label-set-news-feed-item.component.html',
  styleUrls: ['./label-set-news-feed-item.component.scss'],
})
export class LabelSetNewsFeedItemComponent {
  @Input() labelSet?: LabelSet;
  @Input() user?: User;
  actions: boolean = false;

  constructor(
    public auth: AuthService,
    private labelSetService: LabelSetService,
    private router: Router,
    private snackBar: MatSnackBar,
    public urls: UrlsService
  ) {}

  displayActions() {
    this.actions = true;
  }

  forkLabelSet() {
    this.labelSetService.fork(this.labelSet?.id!).subscribe((res: LabelSet) => {
      this.router.navigateByUrl(this.urls.getLabelSetUrl(res.id));
      this.snackBar.open('✅ Label set forked succesfully', 'Dismiss');
    });
  }

  hideActions() {
    this.actions = false;
  }

  isCreator(): boolean {
    return this.auth.username === this.labelSet?.creator?.username;
  }
}
