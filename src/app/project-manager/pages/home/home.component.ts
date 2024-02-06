import { Component } from '@angular/core';
import { Mixin } from 'ts-mixer';

import { Action, Usage } from '@app/interfaces';
import { LoadingStatusMixin } from '@app/mixins';
import {
  AuthService,
  NewsFeedService,
  UsageService,
  UserSettingsService,
} from '@app/services';

@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomePage extends Mixin(LoadingStatusMixin) {
  actions?: Action[];
  usage?: Usage;
  quota?: number;

  constructor(
    public auth: AuthService,
    private newsFeedService: NewsFeedService,
    private usageService: UsageService,
    public userSettingsService: UserSettingsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.startLoading();
    this.newsFeedService.getStreamFollowing().subscribe((res) => {
      this.actions = res.results;
      this.stopLoading();
    });
    this.usageService.getUsage().subscribe((res) => {
      this.usage = res;
      this.quota = res.items / res.limit;
    });
  }

  getType(item: any): string {
    if (item.hasOwnProperty('langtag')) {
      return 'corpus';
    }
    return 'label-set';
  }
}
