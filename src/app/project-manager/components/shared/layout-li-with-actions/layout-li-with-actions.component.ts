import { Component } from '@angular/core';

@Component({
  selector: 'pm-layout-li-with-actions',
  templateUrl: './layout-li-with-actions.component.html',
  styleUrls: ['./layout-li-with-actions.component.scss'],
})
export class LayoutLiWithActionsComponent {
  actions: boolean = false;

  hideActions() {
    this.actions = false;
  }

  displayActions() {
    this.actions = true;
  }
}
