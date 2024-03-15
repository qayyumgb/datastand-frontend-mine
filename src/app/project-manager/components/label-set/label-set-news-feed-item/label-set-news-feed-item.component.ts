import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { LabelSet, User } from '@app/interfaces';
import { AuthService, LabelSetService, UrlsService } from '@app/services';
import { isCreator } from '@pm/utils';

@Component({
  selector: 'pm-label-set-news-feed-item',
  templateUrl: './label-set-news-feed-item.component.html',
  styleUrls: ['./label-set-news-feed-item.component.scss'],
})
export class LabelSetNewsFeedItemComponent implements OnInit {
  @Input() labelSet?: LabelSet;
  @Input() user?: User;
  isCreator?: boolean;

  constructor(
    public auth: AuthService,
    private labelSetService: LabelSetService,
    private router: Router,
    private snackBar: MatSnackBar,
    public urls: UrlsService
  ) {}

  ngOnInit(): void {
    this.isCreator = isCreator(this.labelSet!, this.auth.user?.username);
  }

  forkLabelSet() {
    this.labelSetService.fork(this.labelSet?.id!).subscribe((res: LabelSet) => {
      this.router.navigateByUrl(this.urls.getLabelSetUrl(res.id));
      this.snackBar.open('✅ Label set forked succesfully', 'Dismiss');
    });
  }
}
