import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

import { UserSettingsService } from '@app/services';

@Component({
  selector: 'pm-layout-results-with-paginator',
  templateUrl: './layout-results-with-paginator.component.html',
  styleUrls: ['./layout-results-with-paginator.component.scss'],
})
export class LayoutResultsWithPaginatorComponent {
  @Input() singular?: string;
  @Input() plural?: string;
  // TODO(gustavoauma): Use breakpoint observer to detect mobile.
  isMobile: boolean = window.innerWidth < 768;
  // Paginator elements
  @Input() totalCount?: number;
  @Input() page?: number;
  @Input() paginatedCount?: number;
  @Output() refreshDataEvent = new EventEmitter<void>();

  constructor(public userSettings: UserSettingsService) {}
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isMobile = window.innerWidth < 768;
  }
  refreshData(): void {
    this.refreshDataEvent.emit();
  }
}
