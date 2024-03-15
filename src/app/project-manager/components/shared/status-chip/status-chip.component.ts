import { Component, Input } from '@angular/core';
import { StatusEnum } from '@app/interfaces/abstract';

@Component({
  selector: 'status-chip',
  templateUrl: './status-chip.component.html',
  styleUrls: ['./status-chip.component.scss'],
})
export class StatusChipComponent {
  @Input() status?: StatusEnum;

  statusEnum = StatusEnum;
}
