import { Component, Input } from '@angular/core';

@Component({
  selector: 'pm-no-data-card',
  templateUrl: './no-data-card.component.html',
  styleUrls: ['./no-data-card.component.scss'],
})
export class NoDataCardComponent {
  @Input() title: string = 'No data found';
  @Input() text: string = "This user hasn't uploaded any public data yet";
  @Input() useCard: boolean = true;
}
