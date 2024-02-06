import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Label } from '@app/interfaces';
import { AuthService, LabelService, UrlsService } from '@app/services';
import {
  RenameDialogComponent,
  UpdateLabelDialogComponent,
  UpdateTagsDialogComponent,
} from '@pm/components';

export interface IcopyLabelEvent {
  label: Label;
  originalLabelId: number;
}

@Component({
  selector: 'pm-label-li-item',
  templateUrl: './label-li-item.component.html',
})
export class LabelLiItemComponent {
  @Input() label?: Label;
  @Input() labelSetId?: number;
  @Output() copyLabelEvent = new EventEmitter<IcopyLabelEvent>(); // copied Label
  @Output() deleteLabelEvent = new EventEmitter<number>(); // labelId

  constructor(
    private auth: AuthService,
    private labelService: LabelService,
    private dialog: MatDialog,
    public urls: UrlsService
  ) {}

  copyLabel(label: Label) {
    this.labelService
      .copy(label.id!)
      .subscribe((res: Label) =>
        this.copyLabelEvent.emit({ originalLabelId: label.id!, label: res })
      );
  }

  deleteLabel(label: Label) {
    this.labelService.delete(label.id!).subscribe(() => {
      // We need to emit an event for the parent to update the count.
      this.deleteLabelEvent.emit(label?.id);
      this.label = undefined;
    });
  }

  isCreator(): boolean {
    return this.auth.username === this.label?.creator?.username;
  }

  markLabelAsPending(label: Label) {
    this.labelService
      .setAsPending(label.id!)
      .subscribe((res: Label) => (this.label = res));
  }

  markLabelAsReviewed(label: Label) {
    this.labelService
      .setAsReviewed(label.id!)
      .subscribe((res: Label) => (this.label = res));
  }

  openRenameLabelDialog(label: Label) {
    this.dialog.open(RenameDialogComponent, {
      data: { element: label, type: 'label' },
    });
  }

  openUpdateLabelDialog(label: Label) {
    this.dialog.open(UpdateLabelDialogComponent, {
      data: label,
    });
  }

  openUpdateTagsDialog(label: Label) {
    this.dialog.open(UpdateTagsDialogComponent, {
      data: { element: label, type: 'label' },
    });
  }
}
