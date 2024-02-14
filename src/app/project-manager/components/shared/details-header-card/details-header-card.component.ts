import { Component, Input, OnInit } from '@angular/core';

import { Entity } from '@app/interfaces';
import { UrlsService } from '@app/services';

@Component({
  selector: 'pm-details-header-card',
  templateUrl: './details-header-card.component.html',
  styleUrls: ['./details-header-card.component.scss'],
})
export class DetailsHeaderCardComponent implements OnInit {
  @Input() entity?: Entity;
  @Input() entityType?: string;
  @Input() icon?: string;
  @Input() is_public: boolean = false;
  isMobile:boolean = window.innerWidth <768;
  constructor(public urls: UrlsService) {}

  ngOnInit(): void {
    // Check that entity has the property is_public and set it if it does.
    if (this.entity && 'is_public' in this.entity!) {
      this.is_public = this.entity!.is_public;
    }
  }
}
