import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { UserProfile } from '@app/interfaces';
import { AuthService, UrlsService, UserService } from '@app/services';
import {
  FollowersDialogComponent,
  UpdateUserProfileDialogComponent,
} from '@pm/components';

@Component({
  selector: 'pm-user-details-header-card',
  templateUrl: './user-details-header-card.component.html',
  styleUrls: [
    './user-details-header-card.component.scss',
    '../../change-image-button.scss',
  ],
})
export class UserDetailsHeaderCardComponent {
  @Input() userProfile?: UserProfile;

  constructor(
    public auth: AuthService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    public urls: UrlsService,
    private userService: UserService
  ) {}

  changeImage(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const image: File = event.target.files[0];
      this.userService
        .patchImage(this.userProfile?.username!, image)
        .subscribe((res) => (this.userProfile = res));
    }
  }

  followUser() {
    if (!this.userProfile?.am_i_following) {
      this.userService.follow(this.userProfile?.username!).subscribe((_) => {
        if (this.userProfile) {
          this.userProfile.num_followers = this.userProfile.num_followers! + 1;
          this.userProfile.am_i_following = true;
        }
      });
    }
  }

  getPronouns() {
    if (this.userProfile?.custom_pronouns) {
      return this.userProfile.custom_pronouns;
    } else if (this.userProfile?.pronouns) {
      return this.userProfile.pronouns;
    }
    return '';
  }

  unfollowUser() {
    if (this.userProfile?.am_i_following) {
      this.userService.unfollow(this.userProfile?.username!).subscribe((_) => {
        if (this.userProfile) {
          this.userProfile.num_followers = this.userProfile.num_followers! - 1;
          this.userProfile.am_i_following = false;
        }
      });
    }
  }

  navigateToUserCorpora() {
    this.router.navigate([this.urls.PUBLIC_CORPORA_URL], {
      queryParams: { creator: this.userProfile?.username },
    });
  }

  navigateToUserLabelSets() {
    this.router.navigate([this.urls.PUBLIC_LABEL_SETS_URL], {
      queryParams: { creator: this.userProfile?.username },
    });
  }

  openFollowersDialog() {
    this.dialog.open(FollowersDialogComponent, {
      data: { username: this.userProfile?.username, type: 'followers' },
    });
  }

  openUpdateUserProfileDialog() {
    this.dialog.open(UpdateUserProfileDialogComponent, {
      data: this.userProfile,
    });
  }

  openFollowingDialog() {
    this.dialog.open(FollowersDialogComponent, {
      data: { username: this.userProfile?.username, type: 'following' },
    });
  }
}
