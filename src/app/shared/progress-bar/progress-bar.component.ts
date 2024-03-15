import { Component, Input } from '@angular/core';

@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent {
  @Input() value?: number; // [0,1]

  /**
   * Gets the value for display.
   *
   * This is pessimistic and rounds down to the nearest integer, so that, for example,
   * 99.5 is not displayed as 100.
   *
   * @returns The value for display as a number.
   */
  get valueForDisplay(): number {
    return Math.floor(this.value! * 100);
  }
}
