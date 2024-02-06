import { Component, Input } from '@angular/core';

import { Corpus, LabelSet, User } from '@app/interfaces';
import { UrlsService, UserService } from '@app/services';

@Component({
  selector: 'pm-news-feed-item',
  templateUrl: './news-feed-item.component.html',
  styleUrls: ['./news-feed-item.component.scss'],
})
export class NewsFeedItemComponent {
  @Input() element?: Corpus | LabelSet;
  @Input() user?: User;
  @Input() action?: string;
  hasUnfollowed = false;

  constructor(private userService: UserService, public urls: UrlsService) {}

  unfollowUser() {
    this.userService
      .unfollow(this.user!.username)
      .subscribe(() => (this.hasUnfollowed = true));
  }

  showLessLikeThis() {
    // TODO(gustavoauma): Implement this.
  }
}
