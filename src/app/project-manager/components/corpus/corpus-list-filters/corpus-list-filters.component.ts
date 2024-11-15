import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';

import { LangTag } from '@app/interfaces';
import { CorpusFilters, LangTagService } from '@app/services';
import { BaseListFiltersDirective } from '@pm/directives';

@Component({
  selector: 'pm-corpus-list-filters',
  templateUrl: './corpus-list-filters.component.html',
  styleUrls: ['../../base-list-filters.scss'],
})
export class CorpusListFiltersComponent extends BaseListFiltersDirective {
  @Input() override filters: CorpusFilters = {};
  @Input() isPublicFilter: boolean = false;
  @Output() override updateFiltersEvent = new EventEmitter<CorpusFilters>();
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

  clearLangTag() {
    if (this.filters.langtag) {
      delete this.filters.langtag;
      this.emitAndNavigate();
    }
  }

  updateCreator(change: any) {
    this.filters.creator = change.target.value!;
    this.emitAndNavigate();
  }

  updateLangTag(change: MatSelectChange) {
    this.filters.langtag = change.value;
    this.emitAndNavigate();
  }
}
