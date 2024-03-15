import { Component, Input } from '@angular/core';

type ChipColor = 'purple' | 'orange' | 'red' | 'grey';

@Component({
  selector: 'chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent {
  @Input() matIcon?: string;
  @Input() text?: string;
  @Input() color?: ChipColor = 'purple';
}
