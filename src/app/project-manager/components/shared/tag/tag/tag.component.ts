import { Component, Input } from '@angular/core';

@Component({
  selector: 'pm-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent {
  @Input() tag?: string;
}
