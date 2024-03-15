import { Component, Input } from '@angular/core';

@Component({
  selector: 'is-seed-chip',
  templateUrl: './is-seed-chip.component.html',
  styleUrls: ['./is-seed-chip.component.scss'],
})
export class IsSeedChipComponent {
  @Input() isSeed: boolean = false;
}
