import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';

import { LabelFilters } from '@app/services';
import { BaseListFiltersDirective } from '@pm/directives';

@Component({
  selector: 'pm-task-label-list-filters',
  templateUrl: './task-label-list-filters.component.html',
  styleUrls: ['../../base-list-filters.scss'],
})
export class TaskLabelListFiltersComponent extends BaseListFiltersDirective {
  @Input() override filters: LabelFilters = {};
  @Output() override updateFiltersEvent = new EventEmitter<LabelFilters>();
  isPendingOptions?;

  constructor(
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
  }

  clearIsPending() {
    if (this.filters.is_pending) {
      delete this.filters.is_pending;
      this.emitAndNavigate();
    }
  }

  updateIsPending(change: MatRadioChange) {
    this.filters.is_pending = change.value;
    this.emitAndNavigate();
  }
}
