import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'pm-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  @Input() page: number = 1;
  @Input() count: number = 0;
  @Input() pageSize: number = 20;
  @Input() currentPageSize?: number;
  @Output() updatePaginatorEvent = new EventEmitter<number>(); // selected page

  get start() {
    return (this.page - 1) * this.pageSize + 1;
  }

  get end() {
    if (this.currentPageSize) {
      return this.start + this.currentPageSize - 1;
    }
    return Math.min(this.page * this.pageSize, this.count!);
  }

  constructor(private router: Router, private route: ActivatedRoute) {}

  get lastPage(): number {
    return Math.ceil(this.count! / this.pageSize);
  }

  /** Display an array of pages to be displayed
   * @param maxPages The maximum number of pages to display
   * @returns An array of page numbers to display
   * @throws Error if maxPages is even
   * @example getPageNumbers(1, 5, 5) => [1, 2, 3, 4, 5]
   * @example getPageNumbers(5, 15, 3) => [4, 5, 6]
   * @example getPageNumbers(14, 15, 5) => [11, 12, 13, 14, 15]
   */
  getPageNumbers(
    page: number,
    lastPage: number,
    maxPages: number = 9
  ): number[] {
    if (maxPages % 2 === 0) {
      throw new Error('maxPages must be odd');
    }
    const pagesToShow = Math.min(maxPages, lastPage);
    const pages: number[] = [];
    const middlePage = Math.ceil(pagesToShow / 2);
    if (page <= middlePage) {
      // If the current page is in the first half, display the first maxPages pages
      for (let i = 1; i <= pagesToShow; i++) {
        pages.push(i);
      }
    } else if (page > lastPage - middlePage) {
      // If the current page is in the last half, display the last maxPages pages
      for (let i = lastPage - pagesToShow + 1; i <= lastPage; i++) {
        pages.push(i);
      }
    } else {
      // Otherwise, display the maxPages pages surrounding the current page
      for (let i = page - middlePage + 1; i <= page + middlePage - 1; i++) {
        pages.push(i);
      }
    }
    return pages;
  }

  hasPreviousPage(): boolean {
    return this.page! > 1;
  }

  hasNextPage(): boolean {
    return this.page! < this.lastPage!;
  }

  navigateToNextPage(): void {
    this.emitAndNavigate(this.page! + 1);
  }

  navigateToPage(pageNum: number): void {
    this.emitAndNavigate(pageNum);
  }

  navigateToPreviousPage(): void {
    if (this.page! > 1) {
      this.emitAndNavigate(this.page! - 1);
    }
  }

  emitAndNavigate(pageNum: number): void {
    this.updatePaginatorEvent.emit(pageNum);
    // Update the URL without navigating.
    // https://stackoverflow.com/questions/43698032/
    // Keep original query params
    const queryParams = { ...this.route.snapshot.queryParams, page: pageNum };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
    });
  }
}
