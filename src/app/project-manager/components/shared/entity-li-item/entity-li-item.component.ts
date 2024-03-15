import { Component, Input } from '@angular/core';

import { Entity } from '@app/interfaces';
import { UrlsService } from '@app/services';

@Component({
  selector: 'pm-entity-li-item',
  templateUrl: './entity-li-item.component.html',
  styleUrls: ['./entity-li-item.component.scss'],
})
export class EntityLiItemComponent {
  @Input() entityUrl?: string;
  @Input() imgUrl?: string;
  @Input() entity?: Entity;
  @Input() entityType?: string;

  constructor(public urls: UrlsService) {}
}
