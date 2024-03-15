import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Mixin } from 'ts-mixer';

import { LabelSet } from '@app/interfaces';
import { LoadingStatusMixin, PaginatedItemListMixin } from '@app/mixins';
import {
  LabelSetFilters,
  LabelSetService,
  UserSettingsService,
} from '@app/services';

@Component({
  selector: 'pm-public-label-set-list',
  templateUrl: './public-label-set-list.component.html',
})
export class PublicLabelSetListPage extends Mixin(
  LoadingStatusMixin,
  PaginatedItemListMixin
) {
  filters: LabelSetFilters = { ordering: '-modified' };
  page?: number;

  constructor(
    private labelSetService: LabelSetService,
    private route: ActivatedRoute,
    public userSettings: UserSettingsService
  ) {
    super();
  }

  get labelSets$(): Observable<LabelSet[]> {
    return <Observable<LabelSet[]>>this.items$;
  }

  getLabelSets() {
    this.startLoading();
    this.labelSetService.listByOthers(this.filters).subscribe((res) => {
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
        page: params.get('page')! || 1,
        modifiedLast: params.get('modifiedLast')!,
        ordering: params.get('ordering')!,
        search: params.get('search')!,
        tag: params.get('tag')!,
      };
      this.getLabelSets();
    });
  }
}
