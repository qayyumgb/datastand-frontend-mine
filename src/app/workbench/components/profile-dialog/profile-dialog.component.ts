import { Component } from '@angular/core';

import { AuthService, UrlsService } from '@app/services';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss', '../base-dialog.scss'],
})
export class ProfileDialogComponent {
  user = this.auth.user;

  constructor(public auth: AuthService, public urls: UrlsService) {}
}
