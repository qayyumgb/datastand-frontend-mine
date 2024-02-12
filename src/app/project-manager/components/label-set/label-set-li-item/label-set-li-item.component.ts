import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { LabelSet } from '@app/interfaces';
import { AuthService, LabelSetService, UrlsService } from '@app/services';
import {
  RenameDialogComponent,
  UpdateTagsDialogComponent,
} from '@pm/components';
import { truncate } from '@pm/utils';

@Component({
  selector: 'pm-label-set-li-item',
  templateUrl: './label-set-li-item.component.html',
})
export class LabelSetLiItemComponent {
  @Input() labelSet?: LabelSet;
  @Output() deleteLabelSetEvent = new EventEmitter<number>(); // labelSetId
  truncate = truncate;

  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private labelSetService: LabelSetService,
    private router: Router,
    private snackBar: MatSnackBar,
    public urls: UrlsService
  ) {}

  changeImage(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const image: File = event.target.files[0];
      this.labelSetService
        .patchImage(this.labelSet?.id!, image)
        .subscribe((res) => (this.labelSet = res));
    }
  }

  copyLabelSet() {
    this.labelSetService.copy(this.labelSet?.id!).subscribe((res: LabelSet) => {
      this.router.navigateByUrl(this.urls.getLabelSetUrl(res.id));
      this.snackBar.open('✅ Label set copied succesfully', 'Dismiss');
    });
  }

  deleteLabelSet() {
    this.labelSetService.delete(this.labelSet?.id!).subscribe(() => {
      // We need to emit an event for the parent to update the count.
      this.deleteLabelSetEvent.emit(this.labelSet?.id);
      delete this.labelSet;
    });
  }

  forkLabelSet() {
    this.labelSetService.fork(this.labelSet?.id!).subscribe((res: LabelSet) => {
      this.router.navigateByUrl(this.urls.getLabelSetUrl(res.id));
      this.snackBar.open('✅ Label set forked succesfully', 'Dismiss');
    });
  }

  isCreator(): boolean {
    return this.auth.username === this.labelSet?.creator?.username;
  }

  openRenameLabelSetDialog() {
    this.dialog.open(RenameDialogComponent, {
      data: { element: this.labelSet, type: 'label-set' },
    });
  }

  openUpdateTagsDialog() {
    this.dialog.open(UpdateTagsDialogComponent, {
      data: { element: this.labelSet, type: 'label-set' },
    });
  }
}