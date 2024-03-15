import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Mixin } from 'ts-mixer';

import { Corpus } from '@app/interfaces';
import { LoadingStatusMixin, PaginatedItemListMixin } from '@app/mixins';
import {
  CorpusFilters,
  CorpusService,
  UserSettingsService,
} from '@app/services';

@Component({
  selector: 'pm-public-corpus-list',
  templateUrl: './public-corpus-list.component.html',
})
export class PublicCorpusListPage extends Mixin(
  LoadingStatusMixin,
  PaginatedItemListMixin
) {
  filters: CorpusFilters = { ordering: '-modified' };
  page?: number;

  constructor(
    private corpusService: CorpusService,
    private route: ActivatedRoute,
    public userSettings: UserSettingsService
  ) {
    super();
  }

  get corpora$(): Observable<Corpus[]> {
    return <Observable<Corpus[]>>this.items$;
  }

  getCorpora() {
    this.startLoading();
    this.corpusService.listPublic(this.filters).subscribe((res) => {
      this.setItems(res.results);
      this.setTotalCount(res.count);
      this.page = Number(this.filters?.page!);
      this.stopLoading();
    });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.filters = {
        creator: params.get('creator')!,
        langtag: params.get('langtag')!,
        page: params.get('page')! || 1,
        modifiedLast: params.get('modifiedLast')!,
        ordering: params.get('ordering')!,
        search: params.get('search')!,
        tag: params.get('tag')!,
      };
      this.getCorpora();
    });
  }
}
