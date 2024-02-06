import { Component } from '@angular/core';

import { AuthService, UserSettingsService } from '@app/services';

@Component({
  selector: 'pm-home-intro-card',
  templateUrl: './home-intro-card.component.html',
})
export class HomeIntroCardComponent {
  constructor(
    public authService: AuthService,
    private userSettingsService: UserSettingsService
  ) {}

  hideHomeIntroMessage() {
    this.userSettingsService.hideHomeIntroMessage();
  }
}
