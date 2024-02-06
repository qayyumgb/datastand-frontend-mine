import { Component } from '@angular/core';

import { AuthService, UserSettingsService } from '@app/services';

@Component({
  selector: 'pm-home-welcome-card',
  templateUrl: './home-welcome-card.component.html',
})
export class HomeWelcomeCardComponent {
  constructor(
    public authService: AuthService,
    private userSettingsService: UserSettingsService
  ) {}

  hideHomeWelcomeMessage() {
    this.userSettingsService.hideHomeWelcomeMessage();
  }
}
