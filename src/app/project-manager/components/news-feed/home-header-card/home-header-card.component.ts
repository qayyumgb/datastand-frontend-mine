import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@app/services';

import { FollowersDialogComponent } from '@pm/components';

@Component({
  selector: 'pm-home-header-card',
  templateUrl: './home-header-card.component.html',
  styleUrls: [
    './home-header-card.component.scss',
    '../../base-list-header-card.scss',
  ],
})
export class HomeHeaderCardComponent {
  constructor(private auth: AuthService, private dialog: MatDialog) {}

  openFollowersDialog() {
    this.dialog.open(FollowersDialogComponent, {
      data: { username: this.auth.username, type: 'following' },
    });
  }
}
