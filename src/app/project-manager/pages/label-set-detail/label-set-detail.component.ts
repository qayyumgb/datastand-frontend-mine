import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LabelSet } from '@app/interfaces';
import { LabelSetService } from '@app/services';

@Component({
  selector: 'pm-label-set-detail',
  templateUrl: './label-set-detail.component.html',
})
export class LabelSetDetailPage implements OnDestroy {
  labelSet?: LabelSet;
  routeSubscription: Subscription;

  constructor(
    private labelSetService: LabelSetService,
    private route: ActivatedRoute
  ) {
    this.routeSubscription = this.route.params.subscribe((params) => {
      const labelSetId = Number(params['labelSetId']);
      this.labelSetService
        .retrieve(labelSetId)
        .subscribe((labelSet) => (this.labelSet = labelSet));
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
