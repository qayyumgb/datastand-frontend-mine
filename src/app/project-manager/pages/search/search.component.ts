import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Mixin } from 'ts-mixer';

import { Corpus, LabelSet, Task } from '@app/interfaces';
import { LoadingStatusMixin, PaginatedItemListMixin } from '@app/mixins';
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
export class SearchPage extends Mixin(
  LoadingStatusMixin,
  PaginatedItemListMixin
) {
  filters: SearchFilters = { ordering: '-modified' };
  page?: number;

  constructor(
    private authService: AuthService,
    private searchService: SearchService,
    private route: ActivatedRoute,
    public userSettings: UserSettingsService
  ) {
    super();
    this.startLoading();
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
      this.page = Number(this.filters?.page!);
      // Use merge to combine the observables from the three services
      // into one observable that emits a single array of results
      // when all three observables have emitted their results.
      this.searchService
        .search(this.filters.q!, this.filters)
        .subscribe((res) => {
          this.setItems(res.results);
          this.setTotalCount(res.count);
          this.stopLoading();
        });
    });
  }

  get elements$(): Observable<(Corpus | LabelSet | Task)[]> {
    return <Observable<(Corpus | LabelSet | Task)[]>>this.items$;
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
