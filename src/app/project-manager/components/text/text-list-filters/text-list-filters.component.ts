import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';

import { LangTag } from '@app/interfaces';
import { LangTagService, TextFilters } from '@app/services';
import { BaseListFiltersDirective } from '@pm/directives';

@Component({
  selector: 'pm-text-list-filters',
  templateUrl: './text-list-filters.component.html',
  styleUrls: ['../../base-list-filters.scss'],
})
export class TextListFiltersComponent extends BaseListFiltersDirective {
  @Input() override filters: TextFilters = {};
  @Output() override updateFiltersEvent = new EventEmitter<TextFilters>();
  langTagOptions?: LangTag[];
  isPendingOptions?;

  constructor(
    private langTagService: LangTagService,
    public override router: Router,
    public override route: ActivatedRoute
  ) {
    super(router, route);
    // Override ordering options
    this.orderingOptions = [
      { text: 'Last updated', value: '-modified' },
      { text: 'Most recent', value: '-pk' },
      { text: 'Name', value: 'name' },
    ];
    this.isPendingOptions = [
      { text: 'Pending', value: 'true' },
      { text: 'Reviewed', value: 'false' },
    ];
    this.langTagService
      .getLangTags()
      .subscribe((langTags) => (this.langTagOptions = langTags));
  }

  clearIsPending() {
    if (this.filters.is_pending) {
      delete this.filters.is_pending;
      this.emitAndNavigate();
    }
  }

  clearLangTag() {
    if (this.filters.langtag) {
      delete this.filters.langtag;
      this.emitAndNavigate();
    }
  }

  updateIsPending(change: MatRadioChange) {
    this.filters.is_pending = change.value;
    this.emitAndNavigate();
  }

  updateLangTag(change: MatSelectChange) {
    this.filters.langtag = change.value;
    this.emitAndNavigate();
  }
}
