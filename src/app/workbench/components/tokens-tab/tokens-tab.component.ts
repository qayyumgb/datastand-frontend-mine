import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';

import { selectTokensTabPageModel } from './tokens-tab.selectors';

@Component({
  selector: 'app-tokens-tab',
  templateUrl: './tokens-tab.component.html',
  styleUrls: ['../tabs.scss', './tokens-tab.component.scss'],
})
export class TokensTabComponent implements OnInit {
  vm$ = this.store.select(selectTokensTabPageModel);
  // Paginator
  length: number = 0;
  pageSize = 2000;
  pageIndex = 0;
  pageSizeOptions = [2000, 3000, 4000];
  pageEvent?: PageEvent;

  constructor(private store: Store) {}

  ngOnInit() {
    this.vm$.subscribe((vm) => {
      if (vm.text && vm.text.length > 0) {
        this.length = vm.text.length;
      }
    });
  }

  getPaginatedCharacters(
    text: string,
    pageIndex: number,
    pageSize: number
  ): string[] {
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    return [...text.slice(start, end)];
  }

  /** Handle page event.
   *
   * This method is called when the user changes the page.
   * See: https://material.angular.io/components/paginator/
   * @param e Page event.
   */
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }
}
