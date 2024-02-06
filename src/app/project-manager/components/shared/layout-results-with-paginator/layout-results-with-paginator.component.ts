import { Component, EventEmitter, Input, Output } from '@angular/core';

import { UserSettingsService } from '@app/services';

@Component({
  selector: 'pm-layout-results-with-paginator',
  templateUrl: './layout-results-with-paginator.component.html',
  styleUrls: ['./layout-results-with-paginator.component.scss'],
})
export class LayoutResultsWithPaginatorComponent {
  @Input() singular?: string;
  @Input() plural?: string;
  // Paginator elements
  @Input() totalCount?: number;
  @Input() page?: number;
  @Input() paginatedCount?: number;
  @Output() refreshDataEvent = new EventEmitter<void>();

  constructor(public userSettings: UserSettingsService) {}

  refreshData(): void {
    this.refreshDataEvent.emit();
  }
}
