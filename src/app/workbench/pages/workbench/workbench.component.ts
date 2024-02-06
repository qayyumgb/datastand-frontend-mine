import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { WorkbenchBaseComponent } from '../../components/workbench-base/workbench-base.component';
import { loadTaskData, selectTab } from './workbench.actions';

import { getSelectedTabId } from '@workbench/store/workbench-ui';

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.scss'],
})
export class WorkbenchComponent extends WorkbenchBaseComponent {
  selectedTabId$ = this.store.select(getSelectedTabId);
  // workbenchScrollTop is required for the mouse label to be positioned correctly.
  workbenchScrollTop: number = 0;

  constructor(
    private route: ActivatedRoute,
    public override dialog: MatDialog,
    public override store: Store
  ) {
    super(dialog, store);
    this.route.params.subscribe((params) => {
      const taskId = Number(params['taskId']);
      const taskTextId = Number(params['taskTextId']);
      this.store.dispatch(loadTaskData({ taskId, taskTextId }));
    });
  }

  selectTab(id: number) {
    this.store.dispatch(selectTab({ id }));
    // TODO(gustavoauma): Fix this. Ideally, the history should persist when
    // switching tabs. Right now it is cleared.
    this.store.dispatch({ type: 'CLEAR' });
  }

  updateMouseLabelScroll(event: any) {
    this.workbenchScrollTop = event.target.scrollTop;
  }
}
