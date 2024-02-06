import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
})
export class WindowComponent {
  @Input() title!: string;
  @Input() isVisible: boolean = true;
  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Input() width: string = 'auto';
  @Input() top: string = 'auto';
  @Input() left: string = 'auto';

  constructor() {}

  close() {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }

  open() {
    this.isVisible = true;
    this.isVisibleChange.emit(this.isVisible);
  }
}
