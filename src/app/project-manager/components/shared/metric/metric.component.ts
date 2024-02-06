import { Component, Input } from '@angular/core';

@Component({
  selector: 'metric',
  templateUrl: './metric.component.html',
  styleUrls: ['./metric.component.scss'],
})
export class MetricComponent {
  @Input() value?: number;
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() symbol?: string;
  // If specified, calculate the percentage.
  @Input() total?: number;
  // Use Material Icon if specified by the caller.
  @Input() isMatIcon?: boolean;

  getPercentage(): number {
    if (this.value && this.total) {
      return (this.value / this.total) * 100;
    }
    return 0;
  }
}
