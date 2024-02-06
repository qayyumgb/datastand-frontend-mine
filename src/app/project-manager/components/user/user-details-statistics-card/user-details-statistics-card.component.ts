import { Component, Input } from '@angular/core';
import { Usage } from '@app/interfaces';

@Component({
  selector: 'pm-user-details-statistics-card',
  templateUrl: './user-details-statistics-card.component.html',
  styleUrls: ['./user-details-statistics-card.component.scss'],
})
export class UserDetailsStatisticsCardComponent {
  @Input() usage?: Usage;
}
