import { Component, Input, OnInit } from '@angular/core';

import { Entity } from '@app/interfaces';
import { UrlsService } from '@app/services';

@Component({
  selector: 'pm-entity-li-item',
  templateUrl: './entity-li-item.component.html',
  styleUrls: ['./entity-li-item.component.scss'],
})
export class EntityLiItemComponent implements OnInit {
  actions: boolean = false;
  @Input() entityUrl?: string;
  @Input() imgUrl?: string;
  @Input() entity?: Entity|any;
  @Input() entityType?: string;

  constructor(public urls: UrlsService) {}

  hideActions() {
    this.actions = false;
  }
ngOnInit(){

}
  displayActions() {
    this.actions = true;
  }
}
