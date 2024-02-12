import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mixin } from 'ts-mixer';

import { Corpus } from '@app/interfaces';
import { LoadingStatusMixin, PaginatedItemListMixin } from '@app/mixins';
import {
  CorpusFilters,
  CorpusService,
  UserSettingsService,
} from '@app/services';

@Component({
  selector: 'pm-corpus-list',
  templateUrl: './corpus-list.component.html',
})
export class CorpusListPage
  extends Mixin(LoadingStatusMixin, PaginatedItemListMixin)
  implements OnInit
{
  filters: CorpusFilters = { ordering: '-modified' };
  page?: number;

  constructor(
    private corpusService: CorpusService,
    private route: ActivatedRoute,
    public userSettings: UserSettingsService
  ) {
    super();
  }

  override get items(): Corpus[] {
    return <Corpus[]>this._items;
  }

  getCorpora() {
    this.startLoading();
    this.corpusService.listByMe(this.filters).subscribe((res) => {
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
        is_public: params.get('is_public')!,
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