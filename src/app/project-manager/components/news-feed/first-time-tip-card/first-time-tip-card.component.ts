import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'pm-first-time-tip-card',
  templateUrl: './first-time-tip-card.component.html',
  styleUrls: [
    './first-time-tip-card.component.scss',
    '../../base-list-header-card.scss',
  ],
})
export class FirstTimeTipCardComponent {
  @Output() hideTipEvent = new EventEmitter<boolean>();

  hideTip() {
    this.hideTipEvent.emit(true);
  }
}
