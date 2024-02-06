import { Component, Input } from '@angular/core';

import { User } from '@app/interfaces';
import { UrlsService } from '@app/services';

@Component({
  selector: 'pm-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @Input() user?: User;
  @Input() size?: 'mini' | 'small' | 'medium' | 'large' = 'large';
  @Input() hideUsername: boolean = false;
  @Input() hideImg: boolean = false;

  constructor(public urls: UrlsService) {}
}
