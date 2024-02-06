import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mixin } from 'ts-mixer';

import { Corpus, LabelSet, Task } from '@app/interfaces';
import { PaginatedItemListMixin } from '@app/mixins';
import {
  AuthService,
  SearchFilters,
  SearchService,
  UserSettingsService,
} from '@app/services';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['../base-list-page.scss', '../../components/data-cards.scss'],
})
export class SearchPage extends Mixin(PaginatedItemListMixin) {
  filters: SearchFilters = { ordering: '-modified' };
  page?: number;

  constructor(
    private authService: AuthService,
    private searchService: SearchService,
    private route: ActivatedRoute,
    public userSettings: UserSettingsService
  ) {
    super();
    this.route.queryParamMap.subscribe((params) => {
      this.filters = {
        creator: params.get('creator')!,
        is_public: params.get('is_public')!,
        search: params.get('q')!,
        q: params.get('q')!,
        page: params.get('page')! || 1,
        modifiedLast: params.get('modifiedLast')!,
        ordering: params.get('ordering')!,
        tag: params.get('tag')!,
      };
      // Use merge to combine the observables from the three services
      // into one observable that emits a single array of results
      // when all three observables have emitted their results.
      this.searchService
        .search(this.filters.q!, this.filters)
        .subscribe((res) => {
          this.setItems(res.results);
          this.setTotalCount(res.count);
        });
      this.page = Number(this.filters?.page!);
    });
  }

  override get items(): (Corpus | LabelSet | Task)[] {
    return <(Corpus | LabelSet | Task)[]>this._items;
  }

  asCorpus(item: any): Corpus {
    return item as Corpus;
  }

  asLabelSet(item: any): LabelSet {
    return item as LabelSet;
  }

  asTask(item: any): Task {
    return item as Task;
  }

  isCreator(item: any): boolean {
    return item.creator.username! == this.authService.username!;
  }
}
