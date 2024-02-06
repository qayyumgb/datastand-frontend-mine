import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UrlsService } from '@app/services';

@Component({
  selector: 'pm-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  form = this.fb.group({
    q: ['', Validators.required],
  });

  constructor(
    private urls: UrlsService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  navigateToSearchUrl() {
    if (this.form.valid) {
      this.router.navigate([this.urls.SEARCH_URL], {
        queryParams: { q: this.form.value.q },
      });
    }
  }
}
