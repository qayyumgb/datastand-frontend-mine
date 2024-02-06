import { Component, Input } from '@angular/core';
import { ScreenService, UrlsService } from '@app/services';

@Component({
  selector: 'pm-base-li-with-img',
  templateUrl: './base-li-with-img.component.html',
})
export class BaseLiWithImgComponent {
  @Input() imgUrl?: string;
  @Input() imgSize?: 60 | 120 = 120;

  constructor(public urls: UrlsService, public screen: ScreenService) {}
}
