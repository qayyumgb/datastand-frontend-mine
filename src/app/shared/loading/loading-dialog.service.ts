import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';

@Injectable()
export class LoadingDialogService {
  private opened = false;
  private dialogRef!: MatDialogRef<LoadingDialogComponent>;

  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    if (!this.opened) {
      this.opened = true;
      this.dialogRef = this.dialog.open(LoadingDialogComponent, {
        data: undefined,
        height: '200px',
        width: '250px',
        disableClose: true,
        hasBackdrop: true,
      });

      this.dialogRef.afterClosed().subscribe(() => {
        this.opened = false;
      });
    }
  }

  hideDialog() {
    this.dialogRef.close();
  }
}
