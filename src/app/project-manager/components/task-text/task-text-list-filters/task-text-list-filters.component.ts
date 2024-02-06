import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';

import { LangTag } from '@app/interfaces';
import { StatusEnum } from '@app/interfaces/abstract';
import { LangTagService, TextFilters } from '@app/services';
import { BaseListFiltersDirective } from '@pm/directives';

@Component({
  selector: 'pm-task-text-list-filters',
  templateUrl: './task-text-list-filters.component.html',
  styleUrls: ['../../base-list-filters.scss'],
})
export class TaskTextListFiltersComponent extends BaseListFiltersDirective {
  @Input() override filters: TextFilters = {};
  @Output() override updateFiltersEvent = new EventEmitter<TextFilters>();
  langTagOptions?: LangTag[];
  statusOptions?;

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
    this.statusOptions = [
      { text: 'New', value: StatusEnum.NEW },
      { text: 'In progress', value: StatusEnum.IN_PROGRESS },
      { text: 'Completed', value: StatusEnum.COMPLETED },
      { text: 'Pending', value: StatusEnum.PENDING },
      { text: 'Rejected', value: StatusEnum.REJECTED },
    ];
    this.langTagService
      .getLangTags()
      .subscribe((langTags) => (this.langTagOptions = langTags));
  }

  clearLangTag() {
    if (this.filters.langtag) {
      delete this.filters.langtag;
      this.emitAndNavigate();
    }
  }

  clearStatus() {
    if (this.filters.status) {
      delete this.filters.status;
      this.emitAndNavigate();
    }
  }

  updateLangTag(change: MatSelectChange) {
    this.filters.langtag = change.value;
    this.emitAndNavigate();
  }

  updateStatus(change: MatRadioChange) {
    this.filters.status = change.value;
    this.emitAndNavigate();
  }
}
