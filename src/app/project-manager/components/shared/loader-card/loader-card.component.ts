import { Component, Input } from '@angular/core';

@Component({
  selector: 'loader-card',
  templateUrl: './loader-card.component.html',
  styleUrls: [],
})
export class LoaderCardComponent {
  @Input() isLoading?: boolean;
  @Input() height?: string = '50px';
}
