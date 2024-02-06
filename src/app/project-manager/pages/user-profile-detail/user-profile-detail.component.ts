import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingStatusMixin } from '@app/mixins';
import { Mixin } from 'ts-mixer';

import { Corpus, LabelSet, Usage, UserProfile } from '@app/interfaces';
import {
  AuthService,
  CorpusService,
  LabelSetService,
  UrlsService,
  UsageService,
  UserService,
} from '@app/services';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'pm-user-profile-detail',
  templateUrl: './user-profile-detail.component.html',
  styleUrls: [
    '../../components/change-image-button.scss',
    '../../components/data-cards.scss',
    '../base-items-section.scss',
    '../base-list-page.scss',
    './user-profile-detail.component.scss',
  ],
})
export class UserProfileDetailPage extends Mixin(LoadingStatusMixin) {
  userProfile?: UserProfile;
  usage?: Usage;
  corpora?: Corpus[];
  labelSets?: LabelSet[];

  constructor(
    public auth: AuthService,
    private corpusService: CorpusService,
    private labelSetService: LabelSetService,
    private route: ActivatedRoute,
    private router: Router,
    public urls: UrlsService,
    private usageService: UsageService,
    private userService: UserService
  ) {
    super();
    this.startLoading();
    this.route.params.subscribe((params) => {
      const username = params['username'];
      if (this.auth.username === username) {
        var corpusFn = this.corpusService.listByMe({
          ordering: '-modified',
        });
        var labelSetFn = this.labelSetService.listByMe({
          ordering: '-modified',
        });
      } else {
        var corpusFn = this.corpusService.listPublic({
          creator: username,
          ordering: '-modified',
        });
        var labelSetFn = this.labelSetService.listPublic({
          creator: username,
          ordering: '-modified',
        });
      }
      forkJoin([
        corpusFn,
        labelSetFn,
        this.usageService.getUsage(),
        this.userService.retrieve(username),
      ]).subscribe(([corporaRes, labelSetRes, usageRes, userProfileRes]) => {
        console.log(corporaRes, labelSetRes);
        this.corpora = corporaRes.results;
        this.labelSets = labelSetRes.results;
        this.usage = usageRes;
        this.userProfile = userProfileRes;
        this.stopLoading();
      });
    });
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
}
