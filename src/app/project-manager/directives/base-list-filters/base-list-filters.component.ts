import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';

import { BaseFilters } from '@app/services/common';

@Directive({
  selector: 'pm-base-list-filters',
})
export class BaseListFiltersDirective {
  @Input() filters: BaseFilters = {};
  @Output() updateFiltersEvent = new EventEmitter<BaseFilters>();
  // Options
  isPublicOptions?;
  modifiedLastOptions?;
  orderingOptions?;
  searchInput:string = ''
  showSearch:boolean = false
  searchType:string |null = null 
  filteredLanguage:string|null =null 
  currentVisibility:string|null = null
  currentModification:string|null = null


  constructor(public router: Router, public route: ActivatedRoute) {
    // We intentionally use values as strings here, otherwise the filter comparison
    // doesn't work as expected.
    this.isPublicOptions = [
      { text: 'Private', value: 'false' },
      { text: 'Public', value: 'true' },
    ];
    this.modifiedLastOptions = [
      { text: 'Today', value: '0' },
      { text: 'Last 7 days', value: '7' },
      { text: 'Last 30 days', value: '30' },
      { text: 'Last 90 days', value: '90' },
    ];
    this.orderingOptions = [
      { text: 'Popularity', value: '-num_upvotes,-modified' },
      { text: 'Last updated', value: '-modified' },
      { text: 'Most recent', value: '-pk' },
      { text: 'Name', value: 'name' },
    ];
  }
  showSearchHandling(){
    this.showSearch = !this.showSearch
  }
  handleSearchType(t:string){
    this.searchType = t
  }

  clearModifiedLast() {
    if (this.filters.modifiedLast) {
      delete this.filters.modifiedLast;
      this.emitAndNavigate();
    }
  }

  clearOrdering() {
    if (this.filters.ordering) {
      delete this.filters.ordering;
      this.emitAndNavigate();
    }
  }

  clearIsPublic() {
    if (this.filters.is_public) {
      delete this.filters.is_public;
      this.emitAndNavigate();
    }
  }

  clearSearch() {
    if (this.filters.search) {
      delete this.filters.search;
      this.emitAndNavigate();
    }
  }

  clearTag() {
    if (this.filters.tag) {
      delete this.filters.tag;
      this.emitAndNavigate();
    }
  }

  hasFilters() {
    return (
      this.filters.is_public ||
      this.filters.modifiedLast ||
      this.filters.search ||
      this.filters.tag
    );
  }

  emitAndNavigate() {
    this.updateFiltersEvent.emit(this.filters);
    // Update the URL without navigating.
    // https://stackoverflow.com/questions/43698032/
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { ...this.filters, page: 1 },
    });
  }

  updateIsPublic(change: MatRadioChange) {
    this.filters.is_public = change.value;
    this.emitAndNavigate();
  }
  updateIsPublic2(change:any) {
    this.filters.is_public = change.value;
    this.currentVisibility = change.text
    this.emitAndNavigate();
  }

  updateModifiedLast(change: MatRadioChange) {
    this.filters.modifiedLast = change.value;
    this.emitAndNavigate();
  }
  updateModifiedLast2(change: any) {
    this.filters.modifiedLast = change.value;
    this.currentModification = change.text
    this.emitAndNavigate();
  }

  updateOrdering(change: MatRadioChange) {
    this.filters.ordering = change.value;
    this.emitAndNavigate();
  }
  updateOrdering2(change:string) {
    this.filters.ordering = change;
    this.emitAndNavigate();
  }

  updateSearch(change: any) {
    this.filters.search = change.target.value!;
    this.emitAndNavigate();
  }

  updateTag(change: any) {
    this.filters.tag = change.target.value!;
    this.emitAndNavigate();
  }
}
