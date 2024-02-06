import { Component, Input } from '@angular/core';
import { ScreenService } from '@app/services';

@Component({
  selector: 'pm-list-header-card',
  templateUrl: './list-header-card.component.html',
  styleUrls: ['./list-header-card.component.scss'],
})
export class ListHeaderCardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() extraText?: string;
  @Input() imgUrl?: string;
  // Note: also provide "button" as ng-content.

  constructor(public screen: ScreenService) {}
}
