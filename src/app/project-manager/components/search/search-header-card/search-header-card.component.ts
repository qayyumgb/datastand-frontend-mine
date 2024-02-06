import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UrlsService } from '@app/services';

import { getRandomElement } from '@workbench/utils';

const SUPRISE_QS = ['sonnets', 'queries'];

@Component({
  selector: 'pm-search-header-card',
  templateUrl: './search-header-card.component.html',
})
export class SearchHeaderCardComponent {
  constructor(private router: Router, private urls: UrlsService) {}

  surpriseMe() {
    const q = getRandomElement(SUPRISE_QS);
    this.router.navigate([this.urls.SEARCH_URL], { queryParams: { q } });
  }
}
