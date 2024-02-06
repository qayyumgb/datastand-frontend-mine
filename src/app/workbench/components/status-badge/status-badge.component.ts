import { Component, Input } from '@angular/core';
import { StatusEnum } from '@app/interfaces/abstract';

@Component({
  selector: 'status-badge',
  templateUrl: './status-badge.component.html',
  styleUrls: ['./status-badge.component.scss'],
})
export class StatusBadgeComponent {
  @Input() status?: StatusEnum;
  @Input() size: string = 'medium';
}
