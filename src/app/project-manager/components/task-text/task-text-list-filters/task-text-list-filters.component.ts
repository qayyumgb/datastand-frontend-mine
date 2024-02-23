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
  updateStatus2(change: string) {
    this.filters.status = change;
    this.emitAndNavigate();
  }

  updateLanguage(lan:any){
    this.filteredLanguage = lan.language_name
    this.filters.langtag = lan.tag;
    this.emitAndNavigate();
  }

  searchHandling(e:any){
    switch(this.searchType){
      case 'Tags':
        this.filters.tag = this.searchInput
        this.updateTag(e)
        break
      case 'Text':
        this.filters.search = this.searchInput
        this.updateSearch(e)
        break
      default:
        this.filters.search = this.searchInput
        this.updateSearch(e)
        break
    }
  }
}
