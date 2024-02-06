import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Text } from '@app/interfaces';
import { AuthService, TextService, UrlsService } from '@app/services';
import {
  RenameDialogComponent,
  UpdateTagsDialogComponent,
  UpdateTextDialogComponent,
  ViewTextDialogComponent,
} from '@pm/components';

export interface IcopyTextEvent {
  text: Text;
  originalTextId: number;
}

@Component({
  selector: 'pm-text-li-item',
  templateUrl: './text-li-item.component.html',
})
export class TextLiItemComponent {
  @Input() text?: Text;
  @Input() corpusId?: number;
  @Output() acceptSuggestionEvent = new EventEmitter<Text>();
  @Output() copyTextEvent = new EventEmitter<IcopyTextEvent>(); // copied Text
  @Output() deleteTextEvent = new EventEmitter<number>(); // textId

  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private textService: TextService,
    public urls: UrlsService
  ) {}

  copyText(text: Text) {
    this.textService
      .copy(text.id!)
      .subscribe((res: Text) =>
        this.copyTextEvent.emit({ originalTextId: text.id!, text: res })
      );
  }

  acceptSuggestion(text: Text) {
    this.textService.setAsReviewed(text.id!).subscribe((res: Text) => {
      this.acceptSuggestionEvent.emit(res);
      this.text = res;
      this.snackBar.open(`✅ Suggestion accepted`, 'Dismiss');
    });
  }

  deleteText(text: Text) {
    this.textService.delete(text.id!).subscribe(() => {
      // We need to emit an event for the parent to update the count.
      this.deleteTextEvent.emit(text?.id);
      this.text = undefined;
    });
  }

  isCreator(): boolean {
    return this.auth.username === this.text?.creator?.username;
  }

  markTextAsPending(text: Text) {
    this.textService
      .setAsPending(text.id!)
      .subscribe((res: Text) => (this.text = res));
  }

  markTextAsReviewed(text: Text) {
    this.textService
      .setAsReviewed(text.id!)
      .subscribe((res: Text) => (this.text = res));
  }

  openUpdateTextDialog(text: Text) {
    this.dialog.open(UpdateTextDialogComponent, {
      data: text,
    });
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
    this.dialog.open(ViewTextDialogComponent, {
      data: text,
    });
  }
}
