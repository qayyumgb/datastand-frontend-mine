import { Component, Input } from '@angular/core';

@Component({
  selector: 'is-pending-chip',
  templateUrl: './is-pending-chip.component.html',
  styleUrls: ['./is-pending-chip.component.scss'],
})
export class IsPendingChipComponent {
  @Input() isPending: boolean = false;
}
