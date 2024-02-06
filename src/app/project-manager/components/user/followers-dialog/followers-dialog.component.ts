import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Follower } from '@app/interfaces';
import { UserService } from '@app/services';

interface FollowersDialogData {
  username: string;
  type: 'following' | 'followers';
}

@Component({
  selector: 'pm-followers-dialog',
  templateUrl: './followers-dialog.component.html',
  styleUrls: ['./followers-dialog.component.scss'],
})
export class FollowersDialogComponent {
  followers?: Follower[] = [];
  title?: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FollowersDialogData, // username
    private userService: UserService
  ) {
    if (data.type == 'followers') {
      this.userService
        .listFollowers(data.username)
        .subscribe((res) => (this.followers = res));
    } else if (data.type == 'following') {
      this.userService
        .listFollowing(data.username)
        .subscribe((res) => (this.followers = res));
    }
  }
}
