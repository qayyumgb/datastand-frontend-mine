import { Component, Input } from '@angular/core';

@Component({
  selector: 'color-square',
  templateUrl: './color-square.component.html',
  styleUrls: ['./color-square.component.scss'],
})
export class ColorSquareComponent {
  @Input() color?: string;
  @Input() size: string = '16px';
}
