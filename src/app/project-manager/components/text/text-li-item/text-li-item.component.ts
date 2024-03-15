import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Text } from '@app/interfaces';
import { UrlsService } from '@app/services';
import {
  RenameDialogComponent,
  UpdateTagsDialogComponent,
  UpdateTextDialogComponent,
  ViewTextDialogComponent,
} from '@pm/components';

@Component({
  selector: 'pm-text-li-item',
  templateUrl: './text-li-item.component.html',
})
export class TextLiItemComponent {
  @Input() text?: Text;
  @Input() isSelected?: boolean = false;
  @Input() isCreator?: boolean;
  // All these events emit the textId.
  @Output() copyTextEvent = new EventEmitter<number>();
  @Output() deleteTextEvent = new EventEmitter<number>();
  @Output() deselectTextEvent = new EventEmitter<number>();
  @Output() selectTextEvent = new EventEmitter<number>();
  @Output() setTextAsNotSeedEvent = new EventEmitter<number>();
  @Output() setTextAsSeedEvent = new EventEmitter<number>();
  @Output() setTextStatusToPendingEvent = new EventEmitter<number>();
  @Output() setTextStatusToReviewedEvent = new EventEmitter<number>();

  constructor(private dialog: MatDialog, public urls: UrlsService) {}

  openUpdateTextDialog(text: Text) {
    this.dialog.open(UpdateTextDialogComponent, { data: text });
  }

  openRenameTextDialog(text: Text) {
    this.dialog.open(RenameDialogComponent, {
      data: { element: text, type: 'text' },
    });
  }

  openUpdateTagsDialog(text: Text) {
    this.dialog.open(UpdateTagsDialogComponent, {
      data: { element: text, type: 'text' },
    });
  }

  openViewTextDialog(text: Text) {
    this.dialog.open(ViewTextDialogComponent, { data: text });
  }

  toggleSelection() {
    this.isSelected = !this.isSelected;
    if (this.isSelected) {
      this.selectTextEvent.emit(this.text?.id!);
    } else {
      this.deselectTextEvent.emit(this.text?.id!);
    }
  }
}
