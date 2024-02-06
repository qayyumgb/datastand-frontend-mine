import { Component, Input } from '@angular/core';

@Component({
  selector: 'is-public-chip',
  templateUrl: './is-public-chip.component.html',
  styleUrls: ['./is-public-chip.component.scss'],
})
export class IsPublicChipComponent {
  @Input() isPublic: boolean = false;
}
