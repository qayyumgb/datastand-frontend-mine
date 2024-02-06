import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LangTag } from '@app/interfaces';
import { LangTagService, SearchFilters } from '@app/services';
import { BaseListFiltersDirective } from '@pm/directives';

@Component({
  selector: 'pm-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['../../base-list-filters.scss'],
})
export class SearchFiltersComponent extends BaseListFiltersDirective {
  @Input() override filters: SearchFilters = {};
  @Input() isPublicFilter: boolean = false;
  @Output() override updateFiltersEvent = new EventEmitter<SearchFilters>();
  langTagOptions?: LangTag[];

  constructor(
    private langTagService: LangTagService,
    public override router: Router,
    public override route: ActivatedRoute
  ) {
    super(router, route);
    this.langTagService
      .getLangTags()
      .subscribe((langTags) => (this.langTagOptions = langTags));
  }

  clearCreator() {
    if (this.filters.creator) {
      delete this.filters.creator;
      this.emitAndNavigate();
    }
  }

  updateCreator(change: any) {
    this.filters.creator = change.target.value!;
    this.emitAndNavigate();
  }
}
