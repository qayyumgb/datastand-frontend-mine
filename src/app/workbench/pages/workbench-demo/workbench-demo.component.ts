import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { WorkbenchBaseComponent } from '@workbench/components/workbench-base/workbench-base.component';

@Component({
  selector: 'app-workbench-demo',
  templateUrl: './workbench-demo.component.html',
  styleUrls: ['./workbench-demo.component.scss'],
})
export class WorkbenchDemoComponent extends WorkbenchBaseComponent {
  constructor(public override dialog: MatDialog, public override store: Store) {
    super(dialog, store);
  }
}
