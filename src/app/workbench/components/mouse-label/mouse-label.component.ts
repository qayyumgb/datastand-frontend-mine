import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mouse-label',
  templateUrl: './mouse-label.component.html',
  styleUrls: ['./mouse-label.component.scss'],
})
export class MouseLabelComponent {
  @Input() top: string = '0px';
  @Input() left: string = '0px';
  @Input() isVisible: boolean = false;
  @Input() content!: string | number;
  @Input() color!: string;
}
