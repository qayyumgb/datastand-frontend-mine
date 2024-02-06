import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Corpus } from '@app/interfaces';
import { CorpusService } from '@app/services';

@Component({
  selector: 'pm-corpus-detail',
  templateUrl: './corpus-detail.component.html',
})
export class CorpusDetailPage implements OnDestroy {
  corpus?: Corpus;
  routeSubscription: Subscription;

  constructor(
    private corpusService: CorpusService,
    private route: ActivatedRoute
  ) {
    this.routeSubscription = this.route.params.subscribe((params) => {
      const corpusId = Number(params['corpusId']);
      this.corpusService
        .retrieve(corpusId)
        .subscribe((corpus) => (this.corpus = corpus));
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
