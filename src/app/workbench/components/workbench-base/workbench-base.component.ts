import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import {
  CreateCommentDialogComponent,
  CreateTokenLayerDialogComponent,
  SendFeedbackDialogComponent,
  UpdateNameDialogComponent,
} from '@workbench/components';

@Component({
  selector: 'app-workbench-base',
  templateUrl: './workbench-base.component.html',
  styleUrls: ['./workbench-base.component.scss'],
})
export class WorkbenchBaseComponent {
  // Keep the dialog reference to prevent multiple dialogs from opening.
  // See: https://material.angular.io/components/dialog/overview
  dialogRef: any;

  constructor(public dialog: MatDialog, public store: Store) {}

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == 'F2') {
      this.openDialog(UpdateNameDialogComponent);
    } else if (event.key == 'b' && event.ctrlKey) {
      this.openDialog(SendFeedbackDialogComponent);
    } else if (event.key == 'c' && event.ctrlKey && event.altKey) {
      this.openDialog(CreateCommentDialogComponent);
    } else if (event.key == 'k' && event.ctrlKey && event.altKey) {
      this.openDialog(CreateTokenLayerDialogComponent);
    }
  }

  /** Helper function to open a dialog and track the dialog reference.
   * @param component The component to open in the dialog.
   */
  openDialog(component: any) {
    // Prevent multiple dialogs from opening.
    if (!this.dialogRef) {
      this.dialogRef = this.dialog.open(component);
    }
    this.dialogRef.afterClosed().subscribe(() => (this.dialogRef = null));
  }
}
