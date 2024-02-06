import { Component, Input } from '@angular/core';

import { BaseListFiltersDirective } from '@pm/directives';

@Component({
  selector: 'pm-label-set-list-filters',
  templateUrl: './label-set-list-filters.component.html',
  styleUrls: ['../../base-list-filters.scss'],
})
export class LabelSetListFiltersComponent extends BaseListFiltersDirective {
  @Input() isPublicFilter: boolean = false;

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
